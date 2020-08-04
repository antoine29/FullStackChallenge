import React, { useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import { Button } from 'semantic-ui-react'

const App = ({ getBlogs, setUser}) => {
  const blogFormRef = useRef()
  const history = useHistory();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      getBlogs()
    }
    else history.push('/login')
  }, [])

  return (
    <div>
      <h2>Blogs:</h2>
      <Blogs />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm togglabeRef={blogFormRef} />
      </Togglable>
    </div>
  )
}

const mapDispatchToProps = {
  getBlogs,
  setUser
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)
export default ConnectedApp