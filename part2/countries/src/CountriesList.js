import React from 'react'
import Country from './Country'

const CountriesList = ({countries, countryFilter}) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  return(
    <div>
      {
        filteredCountries.length > 9 ? 
          <p>Too many matches, please specify another filter</p> :
          filteredCountries.length === 1 ?
            <Country country={filteredCountries[0]}/> :
            filteredCountries.length > 0 ?
              filteredCountries.map(country => <p key={country.alpha2Code}>{`${country.name}`}</p>) :
              <p>No country matches with the input</p>
      }
    </div>
  )
}

export default CountriesList