import anecdoteService from '../services/anecdotes'

const sortingAnecdotes = (a, b)  => b.votes - a.votes

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state
    case 'VOTE_ANECDOTE':
      return state
    case 'FETCH_ANECDOTES':
      return action.data.sort(sortingAnecdotes)
    default: return state
  }
}

export const createAnecdote = anecdoteContent => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.patch(anecdote.id, { votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: votedAnecdote
    })
  }
}

export const fetchAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'FETCH_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer