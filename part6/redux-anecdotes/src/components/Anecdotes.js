import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, fetchAnecdotes } from '../reducers/anecdoteReducer'
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

const Anecdotes = ({ anecdotes, voteAnecdote, fetchAnecdotes, setNotification }) => {
  const handleVoteClick = async anecdote => {
    await voteAnecdote(anecdote)
    setNotification(`voting: ${anecdote.content}`, 5000)
    fetchAnecdotes()
  }
  
  return(
    <>
      <h2>Anecdotes</h2>
      <AnecdotesFilter />
      <ul>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVoteClick(anecdote)}
          />)}
      </ul>
    </>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.filter === '' ?
      state.anecdotes :
      state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  fetchAnecdotes,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes) 
export default ConnectedAnecdotes