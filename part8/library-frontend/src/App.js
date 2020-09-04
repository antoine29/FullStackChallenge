import React, { useState } from 'react'
import { useApolloClient, useQuery, useMutation, useSubscription } from '@apollo/client';
import Notification from './components/Notification'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_BOOKS_FILTERED, ALL_AUTHORS, BOOK_ADDED } from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('SUB:::', subscriptionData)
      setNotification(`Adding bok: ${subscriptionData.data.bookAdded.title}`)
      setTimeout(() => {setNotification(null)}, 3000)

      console.log('UPDATING BOOKS CACHE:')
      const booksInStore = client.readQuery({ query: ALL_BOOKS_FILTERED})
      console.log('booksInStore:', booksInStore)
      client.writeQuery({
        query: ALL_BOOKS_FILTERED,
        data: {
          ...booksInStore,
          allBooks: [ ...booksInStore.allBooks, subscriptionData.data.bookAdded]
        }
      })

      const authorsInStore = client.readQuery({ query: ALL_AUTHORS})
      console.log('CACHED AUTHORS:', authorsInStore.allAuthors)
      if(!authorsInStore.allAuthors.find(author => author.name === subscriptionData.data.bookAdded.author.name)){
        console.log('UPDATING AUTHORS CACHE:')
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...authorsInStore,
            allAuthors: [ ...authorsInStore.allAuthors, subscriptionData.data.bookAdded.author]
          }
        })
      }
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
      <Notification notification={notification} setNotification={setNotification}/>
      {
        localStorage.getItem('library-app') ? 
        <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </div>
  
          <Authors show={page === 'authors'} />
  
          <Books show={page === 'books'} />
  
          <NewBook show={page === 'add'} setNotification={setNotification} />
          
          <Recommend show={page === 'recommend'} setNotification={setNotification} />
        </div> :
        <LoginForm setNotification={setNotification} setToken={setToken}/>
      }
    </>
  )
}

export default App