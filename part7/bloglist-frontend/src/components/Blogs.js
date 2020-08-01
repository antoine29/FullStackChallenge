import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { getBlogs, likeBlog } from '../reducers/blogsReducer'

const Blogs = ({ blogs }) => 
  <table>
    <thead></thead>
    <tbody>
      {blogs
      .map(blog =>
      <tr key={blog.id}>
        <td>
          <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
        </td>
        <td>{blog.likes} likes</td>
      </tr>)}
    </tbody>
  </table>

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