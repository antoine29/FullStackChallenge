import React from 'react'

const Persons = ({filter, persons}) => {
    return(
        <div>
        {
          filter === '' ? 
            persons.map(person => <p key={person.name}>{`${person.name} ${person.number}`}</p>)
            :
            persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => <p key={person.name}>{`${person.name} ${person.number}`}</p>)
        }
      </div>
    )
}

export default Persons