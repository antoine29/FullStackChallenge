import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
      filter show with: <input value={filter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br />
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          filter === '' ? 
            persons.map(person => <p key={person.name}>{`${person.name} ${person.number}`}</p>)
            :
            persons.map(person => {
              if (person.name.toLowerCase().includes(filter.toLowerCase()))
                return (<p key={person.name}>{`${person.name} ${person.number}`}</p>)
            })
        }
      </div>
    </div>
  )
}

export default App