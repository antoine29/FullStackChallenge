import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import { getBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'

const App = ({ setNotification, getBlogs }) => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      getBlogs()
    } catch (exception) {
      setNotification('Wrong credentials', 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <h1>Blog List</h1>
      <Notification />
      {user === null ?
        <Togglable buttonLabel='log in'>
          <LoginForm handleLogIn={login} />
        </Togglable> :
        <div>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td> {user.name} logged-in </td>
                <td>
                  <button type="submit" onClick={() => logout()}>logout</button>
                </td>
              </tr>
            </tbody>
          </table>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm togglabeRef={blogFormRef} />
          </Togglable>
          <h2>Blogs:</h2>
          <Blogs />
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  getBlogs
}

const ConnectedApp = connect(null, mapDispatchToProps)(App) 
export default ConnectedApp