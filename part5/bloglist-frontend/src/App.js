import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({author: '', title: '', url: ''})
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null) 

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setErrorMessage(`new blog ${newBlog.title} is being added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewBlog({author: '', title: '', url: ''})
      })
      .catch(error => setErrorMessage(error))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        Author
          <input
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
          />
      </div>
      <div>
        Title
          <input
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
          />
      </div>
      <div>
        Url
          <input
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
          />
      </div>
      <button type="submit">save</button>
    </form>  
  )

  const logout = () => {
    window.localStorage.clear()
    if(user !== null) setUser(null)
  }
  
  return (
    <div>
      <h1>Blog List</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <div>
            <p>{user.name} logged-in</p>
            <button type="submit" onClick={() => logout()}>logout</button>
          </div>

          <p>New blog</p>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App