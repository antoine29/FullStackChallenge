import React from 'react'
import PersonsService from '../PersonsService'

const Persons = ({filter, persons, setPersons}) => {
  const buttonClickHandler = person => () => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      console.log("deleting:", person)
      PersonsService
        .deletePerson(person)
        .then(deletedPerson => 
          setPersons(persons.filter(p => p.id !== deletedPerson.id)))
        .catch(error =>
          alert("Error deleting user, is jsonServer up?"))
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