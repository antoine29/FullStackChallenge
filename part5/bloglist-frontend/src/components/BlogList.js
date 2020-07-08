import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs }) => {
  const [likedBlog, setLikedBlog] = useState(undefined)
  const [deletedBlog, setDeletedBlog] = useState(undefined)

  if(likedBlog){
    setLikedBlog(undefined)
    blogService
      .patch(likedBlog.id, { likes: likedBlog.likes + 1 })
      .then(() => {
        blogService
          .getAll()
          .then(blogs => {
            setBlogs(blogs)
          })
      })
  }

  if(deletedBlog){
    setDeletedBlog(undefined)
    blogService
      ._delete(deletedBlog.id)
      .then(() => {
        blogService
          .getAll()
          .then(blogs => {
            setBlogs(blogs)
          })
      })
  }

  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        setLikedBlog={setLikedBlog}
        setDeletedBlog={setDeletedBlog} />)
}

export default BlogList