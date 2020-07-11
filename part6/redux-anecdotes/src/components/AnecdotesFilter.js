import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdotesFilter = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.filter)
    const filterBy = event => {
      event.preventDefault()
      console.log(event.target.value)
      dispatch(setFilter(event.target.value))
    }

    return (
        <>
          Filter:<input onChange={filterBy} value={state}/>
        </>
    )
}

export default AnecdotesFilter