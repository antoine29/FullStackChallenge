import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const state = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return state !== '' && state !== undefined && state !== null ? (
    <div style={style}>
      {state}
    </div>
  ):
  (<></>)
}

export default Notification