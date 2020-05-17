import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './CountriesList'

function App() {
  const [ countryFilter, setCountryFilter ] = useState('')
  const [ countries, setCountries ] = useState([]);
  const [ selectedCountry, setSelectedCountry ] = useState(undefined)
  const [ selectedCountryWeather, setSelectedCountryWeather ] = useState(undefined)

  const fetchCountries = () => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {setCountries(response.data)})
  }
  useEffect(fetchCountries, [])

  const countryFilterChangeHandler = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(undefined)
  }

  if(process.env.REACT_APP_WEATHER_STACK_API_KEY === ''
    || process.env.REACT_APP_WEATHER_STACK_API_KEY === undefined)
    console.log("WeatherStack API key not setted")

  return (
    <>
      find countries <input value={countryFilter} onChange={countryFilterChangeHandler}/>
      <CountriesList
        countries={countries}
        countryFilter={countryFilter}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCountryWeather={selectedCountryWeather}
        setSelectedCountryWeather={setSelectedCountryWeather}/>
    </>
  );
}

export default App;
