import React from 'react'
import PersonsService from '../PersonsService'
import Notification from './Notification'

const PersonForm = ({
  persons, setPersons,
  newName, setNewName,
  newNumber, setNewNumber,
  notificationHandler}) => {

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
          Notification.ShowNotificationMessage(
            `Updating user: ${person.name}`,
            1500,
            notificationHandler
          )
          PersonsService
            .updatePerson({...person, number: newNumber})
            .then(response => 
              PersonsService.getPersons()
                .then(updatedPersons => setPersons(updatedPersons)))
            .catch(error => {
              if(error.response.status ===  404) {
                Notification.ShowNotificationMessage(
                  `Information of : ${person.name} has already ben removed from server..`,
                  1500,
                  notificationHandler
                )
                PersonsService.getPersons()
                  .then(persons => setPersons(persons))
                  .catch(error =>
                    Notification.ShowNotificationMessage(
                      `Error getting users.`,
                      1500,
                      notificationHandler
                    ))
              }
              if (error.response.data) {
                Notification.ShowNotificationMessage(
                  JSON.stringify(error.response.data),
                  3000,
                  notificationHandler)
              }
              else {
                Notification.ShowNotificationMessage(
                  `Error updating user: ${person.name}`,
                  1500,
                  notificationHandler
                )
              }
            })
        }
      }
      else {
        PersonsService
          .createPerson({name: newName, number: newNumber})
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            if (error.response.data) {
              Notification.ShowNotificationMessage(
                JSON.stringify(error.response.data),
                3000,
                notificationHandler)
            }
            else
              Notification.ShowNotificationMessage(
                `Error adding new user: ${newName}`,
                1500,
                notificationHandler)
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