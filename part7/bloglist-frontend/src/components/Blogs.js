import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getBlogs } from '../reducers/blogsReducer'
import { List } from 'semantic-ui-react'
import Blog from './Blog'
import ResponsiveContainer from './ResponsiveContainer'

const Blogs = ({ blogs, user, getBlogs }) => {

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <ResponsiveContainer>
      <List>
        {blogs.map(blog =>
        <Blog blog={blog} signedUser={user} key={blog.id}/>)}
      </List>
    </ResponsiveContainer>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  getBlogs
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs