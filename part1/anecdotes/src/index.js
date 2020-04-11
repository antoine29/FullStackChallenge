import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const MostVoted = ({votes}) => {
  const mostVotedAnecdoteIndex = 
    votes.reduce((higherVote, vote, currentIndex) =>
      vote > votes[higherVote] ? currentIndex : higherVote, 0)
  
  return ( mostVotedAnecdoteIndex > 0 ? 
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotedAnecdoteIndex]}</p>
      <p>has {votes[mostVotedAnecdoteIndex]} votes</p>
    </> :
    <></>
  )    
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, incrementVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const setRandomAnecdote = () => setSelected(getRandomInteger(0, anecdotes.length))
  
  const setVote = () => {
    const incrementedVotes = [...votes]
    incrementedVotes[selected] += 1;
    incrementVotes(incrementedVotes)
    console.log(incrementedVotes);
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {props.anecdotes[selected]}
      </div>
      <button onClick={setVote}> vote </button>
      <button onClick={setRandomAnecdote}> next anecdote </button>
      <MostVoted votes={votes} />
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)