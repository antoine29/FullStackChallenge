import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { likeBlog, deleteBlog, getBlogs } from '../reducers/blogsReducer'

const Blog = ({ likeBlog, deleteBlog, getBlogs }) => {
  const [blog, setBlog] = useState(null)
  const history = useHistory();
  const blogMatcher = useRouteMatch('/blogs/:id')
  const getBlog = blogId => 
    blogService
      .get(blogId)
      .then(_blog => _blog)
      .catch(error => null)

  useEffect(() => {
    const blogId = blogMatcher ?
      blogMatcher.params.id : null
      getBlog(blogId)
        .then(_blog => {setBlog(_blog)})
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async blog => {
    await likeBlog(blog)
    setBlog(await getBlog(blog.id))
    getBlogs()
  }

  const deleteBlogHandler = async blog => {
    if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`))
      await deleteBlog(blog)
      await getBlogs()
      history.push('/')
  }

  let logedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  return blog !== null ?
    <div style={blogStyle} className='blog'>
      <div>
        <h3>{blog.title}</h3>
        <a href={blog.url} target="_blank">{blog.url}</a>
        <p>
          likes: {blog.likes}
          <button
            className='likeButton'
            onClick={event => {
              event.preventDefault()
              increaseLikes(blog)
            }}>like</button>
        </p>
        <p>Added by: {blog.author}</p>
      </div>
      {logedUser !== null && logedUser.id === blog.user.id &&
      <button
        className='deleteButton'
        onClick={event => {
          event.preventDefault()
          deleteBlogHandler(blog)
        }}>delete</button>}
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