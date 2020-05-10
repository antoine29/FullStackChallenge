import React from 'react'
import PersonsService from '../PersonsService'

const PersonForm = ({
  persons, setPersons,
  newName, setNewName,
  newNumber, setNewNumber}) => {

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const handleNewName = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') alert('empty values are not allowed')
    else {
      if (persons.find(person => person.name === newName) !== undefined)
        alert(`${newName} is already added to phonebook`)
      else {
        console.log('adding ', newName)
        PersonsService
          .createPerson({name: newName, number: newNumber})
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  return(
    <form onSubmit={handleNewName}>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>name</td>
            <td><input value={newName} onChange={handleNameChange}/></td>
          </tr>
          <tr>
            <td>number</td>
            <td><input value={newNumber} onChange={handleNumberChange}/></td>
          </tr>
          <tr>
            <td>
              <button type="submit">add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default PersonForm