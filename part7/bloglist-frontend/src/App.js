import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = ({ getBlogs, setUser, user }) => {
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      getBlogs()
    }
  }, [])

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
          <LoginForm />
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  getBlogs,
  setUser
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App) 
export default ConnectedApp