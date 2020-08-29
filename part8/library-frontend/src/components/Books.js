import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS_GENRES, ALL_BOOKS_FILTERED } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [bookGenres, setBookGenres] = useState([])

  const allBooksQuery = useQuery(ALL_BOOKS_FILTERED)
  const [runBooksLazyQuery, booksLazyQuery] = useLazyQuery(ALL_BOOKS_FILTERED)
  const bookGenresQuery = useQuery(ALL_BOOKS_GENRES)

  useEffect(() => {
    console.log('UPDATING booksLazyQuery')
    if(booksLazyQuery.data) setBooks(booksLazyQuery.data.allBooks)
  }, [booksLazyQuery])

  useEffect(() => {
    console.log('UPDATING allBooksQuery')
    if(allBooksQuery.data){
      setBooks(allBooksQuery.data.allBooks)
      console.log('BOOOKS:', books)
    }
  }, [allBooksQuery])

  useEffect(() => {
    console.log('UPDATING bookGenresQuery')
    if(bookGenresQuery.data) setBookGenres(bookGenresQuery.data.allBookGenres)
  }, [bookGenresQuery])

  const filterBooksBy = (genre, author) => {
    let genreFilter = genre ? genre : null
    let authorFilter = author ? author : null
    console.log(`filtering by genre: ${genreFilter} author: ${authorFilter} `)
    runBooksLazyQuery({ variables: { author: authorFilter, genre: genreFilter }})
  }

  if (!props.show) return null
  
  if (allBooksQuery.loading || bookGenresQuery.loading)
    return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    
    <div>
      <h3>Filter by genre:</h3>
      {bookGenres.map(genre =>
      <button key={genre} onClick={() => filterBooksBy(genre)}>{genre}</button>)}
    </div>
    </div>
  )
}

export default Books