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
      let person = persons.find(person => person.name === newName)
      if (person !== undefined) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one??`)) {
          console.log('updating ', person)          
          PersonsService
            .updatePerson({...person, number: newNumber})
            .then(response => 
              PersonsService.getPersons()
              .then(updatedPersons => setPersons(updatedPersons)))
            .catch(error =>
              alert("Error updating user, is jsonServer up?"))
        }
      }
      else {
        console.log('adding ', newName)
        PersonsService
          .createPerson({name: newName, number: newNumber})
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error =>
            alert("Error adding user, is jsonServer up?"))
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