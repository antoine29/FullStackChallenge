import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, index, setUpdatedBlog, setDeletedFlag }) => {
  const [isViewed, setViewState] = useState(false)
  const [stateBlog, setBlog] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async blog => {
    let updatedBlog = await blogService.patch(blog.id, { likes: blog.likes + 1 })
    setBlog(updatedBlog)
    setUpdatedBlog({index: index, blog: blog})
  }

  const deleteBlog = async blog => {
    if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)){
      await blogService._delete(blog)
      setDeletedFlag(true)
    }
  }

  let logedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  return stateBlog !== undefined ?
    <div style={blogStyle}>   
    {!isViewed?
      stateBlog.title :
      <p>
        {stateBlog.title}
        <br/>
        {stateBlog.url}
        <br/>
        likes: {stateBlog.likes} <button onClick={ event => {
          event.preventDefault()
          increaseLikes(stateBlog)
        }}>like</button>
        <br/>
        {stateBlog.author
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