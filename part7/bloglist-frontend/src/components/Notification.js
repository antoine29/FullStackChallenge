import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Message } from 'semantic-ui-react'

let globalDispatch = null
const NotificationBuilder = (type, message) => {
  let messageType = null
  let messageHeader = ''
  switch(type){
  case 'ERROR': {
    messageType = { negative: true }
    messageHeader = 'Error'
    break
  }
  case 'OK': {
    messageType = { positive: true }
    messageHeader = 'Success'
    break
  }
  default: {
    messageType = { info: true }
    messageHeader = 'Info'
    break
  }
  }

  return (
    <Message {...messageType} onDismiss={() => globalDispatch({ type: 'SET_NOTIFICATION', notification: null })}>
      <Message.Header>{messageHeader}</Message.Header>
      <p>{message}</p>
    </Message>)
}

const Notification = () => {
  globalDispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  return notification !== undefined && notification !== null && notification.message !== '' ?
    NotificationBuilder(notification.type, notification.message) :
    <></>
}

export default Notification