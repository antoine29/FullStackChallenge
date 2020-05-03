import React from 'react'
import Country from './Country'

const CountriesList = ({countries, countryFilter, selectedCountry, setSelectedCountry}) => {
  const filteredCountries = selectedCountry !== undefined ? 
    [selectedCountry] :
    countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  
  const buttonClickHandler = (country) => () => setSelectedCountry(country)

  return(   
    <div>
      {
        filteredCountries.length > 9 ?
          <p>Too many matches, please specify another filter</p> :
          filteredCountries.length === 1 ?
            <Country country={filteredCountries[0]}/> :
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

export default CountriesList