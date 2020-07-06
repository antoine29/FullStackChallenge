import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {        
    const [newBlog, setNewBlog] = useState({author: '', title: '', url: ''})
    const addBlog = event => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({ author: '', title: '', url: '' })
    }

    return(
        <form onSubmit={ addBlog }>
          <div>
            Author
              <input
                value={newBlog.author}
                onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
              />
          </div>
          <div>
            Title
              <input
                value={newBlog.title}
                onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
              />
          </div>
          <div>
            Url
              <input
                value={newBlog.url}
                onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
              />
          </div>
          <button type="submit">save</button>
        </form>)
}

export default BlogForm