import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const fetchPersons = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(fetchPersons, [])

  const handleNewName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined)
      alert(`${newName} is already added to phonebook`)
    else {
      if (newName === '' || newNumber === '') alert('empty values are not allowed')
      else {
        console.log('adding ', newName)
        setPersons(persons.concat({name: newName, number: newNumber}))
      }
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm
        handleNewName={handleNewName}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App