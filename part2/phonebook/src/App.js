import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './PersonsService'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const fetchPersons = () => {
    PersonsService
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }
  
  useEffect(fetchPersons, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName}setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App