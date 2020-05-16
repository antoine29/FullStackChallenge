import React from 'react'
import PersonsService from '../PersonsService'
import Notification from './Notification'

const Persons = ({
  filter,
  persons, setPersons,
  notificationHandler}) => {
  const buttonClickHandler = person => () => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      Notification.ShowNotificationMessage(
        `Deleting user: ${person.name}`,
        1500,
        notificationHandler
      )
      PersonsService
        .deletePerson(person)
        .then(deletedPerson => 
          setPersons(persons.filter(p => p.id !== deletedPerson.id)))
        .catch(error =>
          Notification.ShowNotificationMessage(
            "Error deleting user, is jsonServer up?",
            2000,
            notificationHandler
          )
        )
    }
  }

  const filteredPersons = filter === '' ?
    persons :
    persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return(
    <div>
      <table>
        <thead></thead>
        <tbody>
        {
          filteredPersons.map(person =>
            <tr key={person.name}>
              <td>{ person.name }</td>
              <td>{ person.number }</td>
              <td>
                <button onClick={buttonClickHandler(person)}>delete</button>
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default Persons