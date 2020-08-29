import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import Notification from './components/Notification'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = ({apolloClient}) => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

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