import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import AnecdotesFilter from './AnecdotesFilter'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const state = useSelector(state =>
    state.filter === '' ?
      state.anecdotes :
      state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

  const handleVoteClick = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`voting: ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification('')), 3000)
  }
  
  return(
    <>
      <h2>Anecdotes</h2>
      <AnecdotesFilter />
      <ul>
        {state.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVoteClick(anecdote)}
          />)}
      </ul>
    </>
  )
}

export default Anecdotes