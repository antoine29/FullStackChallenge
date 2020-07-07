// import React, { useState, useImperativeHandle } from 'react'
import React, { useState } from 'react'
import Blog from './Blog'

// const BlogList = React.forwardRef((props, ref) => {
const BlogList = ({ blogs, setBlogs }) => {
    const [updatedBlog, setUpdatedBlog] = useState(undefined)
    // const [deletedBlogFlag, setDeletedBlogFlag] = useState(false)

    
    // const { blogs, setBlogs } = props
    // useImperativeHandle(ref, () => {
    //     return {
    //         deletedBlogFlag,
    //         setDeletedBlogFlag
    //     }
    // })

    if(updatedBlog !== undefined) {
        blogs[updatedBlog.index] = updatedBlog.blog
        setUpdatedBlog(undefined)
        setBlogs(blogs)
    }

    return blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog, index) =>
          <Blog
            key={blog.id}
            blog={blog}
            index={index}
            setUpdatedBlog={setUpdatedBlog} />)
    }
  
export default BlogList