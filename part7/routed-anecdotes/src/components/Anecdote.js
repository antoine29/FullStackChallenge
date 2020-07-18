import React from 'react'
import { useHistory } from "react-router-dom"

const Anecdote = ({anecdote}) => {
    const history = useHistory();
    if (!anecdote) history.push('/')
    return (
        <div>
            <h2>{ anecdote.content }</h2>
            <p>has { anecdote.votes } votes</p>
            <p>for more info see  <a href={anecdote.info}> {anecdote.info}</a> </p>
        </div>)
}

export default Anecdote