import React from 'react'
import { connect } from 'react-redux'
import { getBlogs, likeBlog } from '../reducers/blogsReducer'
import Blog from './Blog'

const Blogs = ({ blogs }) => 
  blogs
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        />)

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