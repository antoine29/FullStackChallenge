import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs }) => {
  const [updatedBlogListFlag, setUpdatedBlogListFlag] = useState(false)
  if(updatedBlogListFlag){
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
        setUpdatedBlogListFlag(false)
      })
  }

  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map((blog, index) =>
      <Blog
        key={blog.id}
        blog={blog}
        index={index}
        setUpdatedBlogListFlag={setUpdatedBlogListFlag} />)
}

export default BlogList