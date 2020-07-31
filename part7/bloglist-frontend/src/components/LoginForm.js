import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { getBlogs } from '../reducers/blogsReducer'
import loginService from '../services/login'

const LoginForm = ({ user, setUser, setNotification, getBlogs }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON || user) history.push('/')
  }, [user])

  const loginUser = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
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
      <form onSubmit={loginUser}>
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  setUser,
  getBlogs
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm