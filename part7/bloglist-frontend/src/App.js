import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import Blogs from './components/Blogs'

const App = ({ getBlogs, setUser}) => {
  const history = useHistory()
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
      <Blogs />
    // <div>
    // </div>
  )
}

const mapDispatchToProps = {
  getBlogs,
  setUser
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)
export default ConnectedApp