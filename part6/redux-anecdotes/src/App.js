import React from 'react'
import Notification from './components/Notification'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App