import React from 'react'

const Persons = ({filter, persons}) => {
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
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default Persons