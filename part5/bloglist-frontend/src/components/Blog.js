import React, { useState } from 'react'

const Blog = ({ blog, setLikedBlog, setDeletedBlog }) => {
  const [isViewed, setViewState] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async blog => setLikedBlog(blog)

  const deleteBlog = async blog => {
    if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`))
      setDeletedBlog(blog)
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
        deleteBlog(blog)
      }}>delete</button>}
      <button className='viewButton' onClick={() => setViewState(!isViewed)}>
        {!isViewed? 'view':'hide'}
      </button>
    </div> :
    <></>
}

export default Blog