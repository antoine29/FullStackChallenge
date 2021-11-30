import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTimedNotification } from '../reducers/notificationReducer'
import { getBlogs, createBlog } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import { Button, Form, Modal } from 'semantic-ui-react'

const BFModal = ({ children, openedCreateBlogForm, openCreateBlogForm, addBlog }) =>
  <Modal
    onClose={() => openCreateBlogForm(false)}
    onOpen={() => openCreateBlogForm(true)}
    open={openedCreateBlogForm}>
    <Modal.Header>Add blog:</Modal.Header>
    <Modal.Content>
      {children}
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={() => openCreateBlogForm(false)}>
        Cancel
      </Button>
      <Button
        content="Save"
        labelPosition='right'
        icon='checkmark'
        onClick={event => {
          event.preventDefault()
          addBlog()
          openCreateBlogForm(false)
        }}
        positive />
    </Modal.Actions>
  </Modal>

const AddBlogForm = ({ openedCreateBlogForm, openCreateBlogForm, setTimedNotification, getBlogs, createBlog, setUser }) => {
  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' })
  const history = useHistory()

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    history.push('/signin')
  }

  const addBlog = async () => {
    try{
      setTimedNotification({ type: 'OK', message: `new blog ${newBlog.title} is being added` }, 5000)
      await createBlog(newBlog)
      setNewBlog({ author: '', title: '', url: '' })
      getBlogs()
    }
    catch(error)
    {
      if(error === 'jwt expired'){
        setNewBlog({ author: '', title: '', url: '' })
        logout()
        setTimedNotification({ type: 'ERROR', message: 'Expired session' }, 5000)
      }
      else setTimedNotification({ type: 'ERROR', message: error }, 5000)
    }
  }

  return(
    <BFModal openedCreateBlogForm={openedCreateBlogForm} openCreateBlogForm={openCreateBlogForm} addBlog={addBlog}>
      <Form>
        <Form.Field>
          <label>Author</label>
          <input
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
        </Form.Field>
        <Form.Field>
          <label>Title</label>
          <input
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
        </Form.Field>
      </Form>
    </BFModal>)
}

const mapDispatchToProps = {
  setTimedNotification,
  getBlogs,
  createBlog,
  setUser
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(AddBlogForm)
export default ConnectedBlogForm