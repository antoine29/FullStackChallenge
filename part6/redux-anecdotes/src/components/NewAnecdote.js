import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`creating anecdote: ${newAnecdote}`))
    setTimeout(() => dispatch(setNotification('')), 3000)
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

export default NewAnecdote