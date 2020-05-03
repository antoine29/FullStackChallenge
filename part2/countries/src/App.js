import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './CountriesList'

function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined)

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

  return (
    <>
      find countries <input value={countryFilter} onChange={countryFilterChangeHandler}/>
      <CountriesList
        countries={countries}
        countryFilter={countryFilter}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}/>
    </>
  );
}

export default App;
