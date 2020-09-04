import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS_FILTERED } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, {
    onError: error => {
      console.log('ERROR:', error)
      if(error.graphQLErrors[0]){
        console.log('ERROR:', error.graphQLErrors[0].message)
        props.setNotification(error.graphQLErrors[0].message)
        setTimeout(() => { props.setNotification(null) }, 2000);
      }
    }
  })
  
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(`adding book: title: ${title}, published: ${published}, author: ${author}, genres: ${genres}`)
    addBook({ variables: { title, author, published: Number(published), genres } })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <td>title</td>
              <td>
                <input
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>author</td>
              <td>
                <input
                  value={author}
                  onChange={({ target }) => setAuhtor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>published</td>
              <td>
                <input
                  type='number'
                  value={published}
                  onChange={({ target }) => setPublished(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>genres: </td>
              <td>{genres.join(' ')}</td>
            </tr>
            <tr>
              <td>
                <input
                  value={genre}
                  onChange={({ target }) => setGenre(target.value)}
                />
              </td>
              <td>
                <button onClick={addGenre} type="button">add genre</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook