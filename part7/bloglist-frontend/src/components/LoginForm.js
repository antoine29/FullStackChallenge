import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { getBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, setNotification, getBlogs }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSetUser = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      getBlogs()
    } catch (exception) {
      setNotification('Wrong credentials', 5000)
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSetUser}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit" id='loginButton'>login</button>
      </form>
    </div>)
}

const mapDispatchToProps = {
  setNotification,
  setUser,
  getBlogs
}

const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm