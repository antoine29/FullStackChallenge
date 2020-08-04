import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setTimedNotification } from '../reducers/notificationReducer'
import { getBlogs, createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ togglabeRef, setTimedNotification, getBlogs, createBlog }) => {
  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' })
  const addBlog = async event => {
    event.preventDefault()
    setTimedNotification({type: 'OK', message: `new blog ${newBlog.title} is being added`}, 5000)
    await createBlog(newBlog)
    setNewBlog({ author: '', title: '', url: '' })
    getBlogs()
    togglabeRef.current.toggleVisibility()
  }

  return(
    <form onSubmit={ addBlog } className='blogForm'>
      <div>
        Author
        <input
          id='authorInput'
          className='authorInput'
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
      </div>
      <div>
        Title
        <input
          id='titleInput'
          className='titleInput'
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
      </div>
      <div>
        Url
        <input
          id='urlInput'
          className='urlInput'
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
      </div>
      <button type="submit">save</button>
    </form>)
}

const mapDispatchToProps = {
  setTimedNotification,
  getBlogs,
  createBlog
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm