const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const toAnecdoteObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortingAnecdotes = (a, b)  => b.votes - a.votes

const _voteAnecdote = (state, anecdoteId) => {
  console.log('voting: ', anecdoteId)
  return state
    .map(anecdote =>
      anecdote.id === anecdoteId ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
    .sort(sortingAnecdotes)
}

const _createAnecdote = (state, anecdote) => {
  console.log('creating: ', anecdote)
  return [...state, anecdote].sort(sortingAnecdotes)
}

const initialState = anecdotesAtStart
  .map(toAnecdoteObject)
  .sort(sortingAnecdotes)

const anecdotesReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return _createAnecdote(state, action.data)
    case 'VOTE_ANECDOTE':
      return _voteAnecdote(state, action.data.id)
    default: return state
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'NEW_ANECDOTE',
    data: toAnecdoteObject(anecdote)
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export default anecdotesReducer