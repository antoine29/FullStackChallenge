import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleNewName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined)
      alert(`${newName} is already added to phonebook`)
    else {
      if (newName === '' || newPhone === '') alert('empty values are not allowed')
      else {
        console.log('adding ', newName)
        setPersons(persons.concat({name: newName, phone: newPhone}))
      }
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br />
          phone: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{`${person.name} ${person.phone}`}</p>)}
      </div>
    </div>
  )
}

export default App