import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  let authors = []

  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: error => { console.log(error.graphQLErrors[0].message)}
  })

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>
  else authors = result.data.allAuthors

  const optionChange = event => {
    console.log('picking:', event.target.value)
    setSelectedAuthor(event.target.value)
  }

  const updateAuthorBirthdate = event => {
    event.preventDefault()
  
    if(born === ''){
      alert('born must be a number')
    }
    else{
      let _author = null
      if(!selectedAuthor) _author = authors.length > 0 ? authors[0].name : null
      else _author = selectedAuthor
      console.log(_author)
      console.log(Number(born))
      if(_author) updateAuthor({ variables: { name: _author, born: Number(born)}})
      setBorn('')
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Update author birtyear</h2>
        <form onSubmit={updateAuthorBirthdate}>
          <select onChange={optionChange}>
            {authors.map(author => 
            <option
              key={author.id}
              value={author.name}>
              {author.name}
            </option>)}
          </select>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
