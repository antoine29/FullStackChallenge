import React, { useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = ({ getBlogs, setUser, user }) => {
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

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    history.push('/login')
  }

  return (
    <div>
      <div>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              {user !== null &&
              <td> {user.name} logged-in </td>}
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