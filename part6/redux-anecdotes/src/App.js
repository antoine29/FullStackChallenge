import React, {useEffect} from 'react'
import Notification from './components/Notification'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import { fetchAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchAnecdotes()) }, [dispatch])

  return (
    <div>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App