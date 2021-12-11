import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setTimedNotification } from '../reducers/notificationReducer'
import { getBlogs, createBlog } from '../reducers/blogsReducer'
import { setUser } from '../reducers/userReducer'
import { Button, Form, Modal } from 'semantic-ui-react'

const AddBlogModal = ({user, newBlog, setNewBlog, openedCreateBlogForm, openCreateBlogForm, addBlog, history }) => 
  <Modal
    onClose={() => openCreateBlogForm(false)}
    onOpen={() => openCreateBlogForm(true)}
    open={openedCreateBlogForm}>
    <Modal.Header>{user ? "Add blog:" : "Sign in required"}</Modal.Header>
      {user ?
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              value={newBlog.title}
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <input
              value={newBlog.content}
              onChange={({ target }) => setNewBlog({ ...newBlog, content: target.value })}/>
          </Form.Field>
        </Form>
      </Modal.Content> : null}
      <Modal.Actions>
        <Button
          color='black'
          onClick={() => openCreateBlogForm(false)}> Cancel
        </Button>
        <Button
          content= {user ? "Save" : "Sign in"}
          labelPosition='right'
          icon='checkmark'
          onClick={event => {
            if(user){
              event.preventDefault()
              addBlog()
              openCreateBlogForm(false)
            }
            else history.push('/signin')
          }} positive /> 
      </Modal.Actions>
  </Modal>

const AddBlogForm = ({ user, openedCreateBlogForm, openCreateBlogForm, setTimedNotification, getBlogs, createBlog, setUser }) => {
  const [newBlog, setNewBlog] = useState({ title: '', content: '' })
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
      // ToDo: move this jwt expiration check to services or function?
      if(error === 'jwt expired'){
        setNewBlog({ author: '', title: '', url: '' })
        logout()
        setTimedNotification({ type: 'ERROR', message: 'Expired session' }, 5000)
      }
      else setTimedNotification({ type: 'ERROR', message: error }, 5000)
    }
  }

  return(
    <AddBlogModal
      user={user}
      newBlog={newBlog}
      setNewBlog={setNewBlog}
      openedCreateBlogForm={openedCreateBlogForm}
      openCreateBlogForm={openCreateBlogForm}
      addBlog={addBlog}
      history={history}/>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setTimedNotification,
  getBlogs,
  createBlog,
  setUser
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(AddBlogForm)
export default ConnectedBlogForm