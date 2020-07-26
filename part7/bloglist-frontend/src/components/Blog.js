import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog, getBlogs } from '../reducers/blogsReducer'

const Blog = ({ blog, likeBlog, deleteBlog, getBlogs }) => {
  const [isViewed, setViewState] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async blog => {
    await likeBlog(blog)
    getBlogs()
  }

  const deleteBlogHandler = async blog => {
    if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`))
      await deleteBlog(blog)
      getBlogs()
  }

  let logedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  return blog !== undefined ?
    <div style={blogStyle} className='blog'>
      {!isViewed?
        blog.title :
        <p>
          {blog.title}
          <br/>
          {blog.url}
          <br/>
          likes: {blog.likes} <button className='likeButton' onClick={ event => {
            event.preventDefault()
            increaseLikes(blog)
          }}>like</button>
          <br/>
          {blog.author}
        </p>}
      {logedUser !== null && logedUser.id === blog.user.id &&
      <button className='deleteButton' onClick={ event => {
        event.preventDefault()
        deleteBlogHandler(blog)
      }}>delete</button>}
      <button className='viewButton' onClick={() => setViewState(!isViewed)}>
        {!isViewed? 'view':'hide'}
      </button>
    </div> :
    <></>
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  getBlogs
}

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog)
export default ConnectedBlog