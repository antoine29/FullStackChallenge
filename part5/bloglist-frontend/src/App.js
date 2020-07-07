import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglabe'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()
  const blogListRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleNewBlog = newBlog => {
    setErrorMessage(`new blog ${newBlog.title} is being added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
      })
      .catch(error => {
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={errorMessage} />
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
            <BlogForm createBlog={handleNewBlog} />
          </Togglable>
          <h2>Blogs:</h2>
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </div>
      }
    </div>
  )
}

export default App