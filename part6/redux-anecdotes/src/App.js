import React, {useEffect} from 'react'
import Notification from './components/Notification'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App