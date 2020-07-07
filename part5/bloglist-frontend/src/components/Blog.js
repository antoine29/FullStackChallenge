import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setUpdatedBlogListFlag }) => {
  const [isViewed, setViewState] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async blog => {
    await blogService.patch(blog.id, { likes: blog.likes + 1 })
    setUpdatedBlogListFlag(true)
  }

  const deleteBlog = async blog => {
    if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)){
      await blogService._delete(blog.id)
      setUpdatedBlogListFlag(true)
    }
  }

  let logedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  return blog !== undefined ?
    <div style={blogStyle}>   
    {!isViewed?
      blog.title :
      <p>
        {blog.title}
        <br/>
        {blog.url}
        <br/>
        likes: {blog.likes} <button onClick={ event => {
          event.preventDefault()
          increaseLikes(blog)
        }}>like</button>
        <br/>
        {blog.author
      }</p>}
      {logedUser.id === blog.user.id &&
      <button onClick={() => deleteBlog(blog)}>delete</button>}
      <button onClick={() => setViewState(!isViewed)}>
        {!isViewed? 'view':'hide'}
      </button>
    </div> :
    <></>
}
  

export default Blog