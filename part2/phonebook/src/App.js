import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './PersonsService'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  const fetchPersons = () => {
    PersonsService
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        Notification
        .ShowNotificationMessage(
          "Error fetching users, is jsonServer up?",
          2000,
          setNotificationMessage)
      })
  }

  useEffect(fetchPersons, [])

  return (
    <div>
      <Notification.NotificationComponent message={notificationMessage}/>
      <h2>PhoneBook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        notificationHandler={setNotificationMessage} />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons} setPersons={setPersons}
        notificationHandler={setNotificationMessage} />
    </div>
  )
}

export default App