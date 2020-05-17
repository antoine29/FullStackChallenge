import React from 'react'
import axios from 'axios'
import Country from './Country'

const getCountryWeather = (country, selectedCountryWeather, setSelectedCountryWeather) => {
  const apiKey = process.env.REACT_APP_WEATHER_STACK_API_KEY
  let countryQuery = `${country.name}, ${country.capital}`
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${countryQuery}`
  // const mockedUrl = `http://localhost:8000/weather?query=${country.name}`

  if(apiKey !== '' && apiKey !== undefined  &&
    (selectedCountryWeather === undefined || selectedCountryWeather.name !== country.name)) {
    console.log("FETCHING", url)
    // console.log("FETCHING", mockedUrl)
    
    axios
		  // .get(mockedUrl)
		  .get(url)
		  .then(response => {
        response.data.name = country.name
        console.log(response.data)
        setSelectedCountryWeather(response.data)
      })
		  .catch(error => {
		  	console.log("error fetching weather data")
		  })
  }
}

const CountriesList = ({
  countries, countryFilter,
  selectedCountry, setSelectedCountry,
  selectedCountryWeather, setSelectedCountryWeather}) => {
  const filteredCountries = selectedCountry !== undefined ? 
    [selectedCountry] :
    countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  
  const buttonClickHandler = (country) => () => setSelectedCountry(country)
  
  if(filteredCountries.length === 1) {
    getCountryWeather(filteredCountries[0], selectedCountryWeather, setSelectedCountryWeather)
    return (
      <Country country={filteredCountries[0]} countryWeather={selectedCountryWeather}/>
    )
  }
  else {
    return (
      <div>
      {
        filteredCountries.length > 9 ?
          <p>Too many matches, please specify another filter</p> :
            filteredCountries.length > 0 ?
              <table>
                <thead></thead>
                <tbody>
                  {
                    filteredCountries.map(country =>
                      <tr key={country.alpha2Code}>
                        <td>{country.name}</td>
                        <td>
                          <button onClick={buttonClickHandler(country)}>show</button>
                        </td>
                      </tr>)
                  }
                </tbody>
              </table> :
              <p>No country matches with the input</p>
      }
      </div>
    )
  }
}

export default CountriesList