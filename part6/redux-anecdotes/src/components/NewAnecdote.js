import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote, fetchAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = ({ createAnecdote, fetchAnecdotes, setNotification }) => {
  const addAnecdote = async event => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    await createAnecdote(anecdoteContent)
    setNotification(`creating anecdote: ${anecdoteContent}`, 3000)
    fetchAnecdotes()
  }

  return (
    <>
      <h2>create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">add</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  fetchAnecdotes,
  setNotification
}

const ConnectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)
export default ConnectedNewAnecdote