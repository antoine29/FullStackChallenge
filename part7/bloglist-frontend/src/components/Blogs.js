import React from 'react'
import { connect } from 'react-redux'
import { getBlogs, likeBlog } from '../reducers/blogsReducer'
import { List } from 'semantic-ui-react'
import Blog from './Blog'

const Blogs = ({ blogs, getBlogs, likeBlog }) => {

  return (
      <List>
      {blogs
        .map(blog =>
          <Blog blog={blog} key={blog.id}/>
          )
      }
    </List>
  )
}
  

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  getBlogs,
  likeBlog
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs