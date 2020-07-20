import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const fetchCountry = name => {
  const baseUrl = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  return axios
    .get(baseUrl)
    .then(response => {
      console.log('fetched country:', response)
      return response.data[0]
    })
    .catch(error => console.log('error fetching country:', name))
}

const useCountry = name => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    fetchCountry(name)
      .then(country => setCountry(country))
  }, [])

  if(country !== undefined && country !== null){
    if(country.name.toLowerCase() !== name.toLowerCase()){
      fetchCountry(name)
        .then(country => setCountry(country))
    }
  }
  else{
    fetchCountry(name)
      .then(country => setCountry(country))
  }

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App