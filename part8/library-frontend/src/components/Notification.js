import React from 'react'

const LoginForm = ({ notification, setNotification }) => {
  return (
        notification !== null ?
        <div style={{border: 0}}>
            <h3>{notification}</h3>
        </div> : 
        null
  )
}

export default LoginForm