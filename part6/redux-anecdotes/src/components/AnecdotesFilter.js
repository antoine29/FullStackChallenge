import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdotesFilter = ({ filter, setFilter}) => {
  const filterBy = event => {
    event.preventDefault()
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <>
      Filter:<input onChange={filterBy}/>
    </>
  )
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedAnecdotesFilter = connect(null, mapDispatchToProps)(AnecdotesFilter)
export default ConnectedAnecdotesFilter