import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, fetchAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    await dispatch(createAnecdote(anecdoteContent))
    dispatch(setNotification(`creating anecdote: ${anecdoteContent}`, 3000))
    dispatch(fetchAnecdotes())
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