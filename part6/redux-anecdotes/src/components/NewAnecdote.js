import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    const anecdote = await anecdotesService.createNew(anecdoteContent)
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`creating anecdote: ${anecdote.content}`))
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