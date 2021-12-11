import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { SignIn } from '../services/auth'
import { setUser } from '../reducers/userReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import { getBlogs } from '../reducers/blogsReducer'
import ResponsiveContainer from './ResponsiveContainer'
import { getUserInLocalStorage } from '../utils/utils'

const SignInForm = ({ user, setUser, setTimedNotification, getBlogs }) => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ToDo: this user check should be moved to container comp
  useEffect(() => {
    if (!!getUserInLocalStorage() || user) history.push('/blogs')
  }, [user])

  const loginUser = async event => {
    event.preventDefault()
    try {
      const user = await SignIn({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      getBlogs()
    }
    catch (exception) {
      setTimedNotification({ type: 'ERROR', message: 'Wrong credentials' }, 5000)
    }
    finally{
      setUsername('')
      setPassword('')
    }
  }

  return (
    <ResponsiveContainer>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            BlogList Sign In
          </Header>
          {/* ToDo: add validation for the form */}
          <Form size='large' onSubmit={loginUser}>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='User name'
                value={username}
                onChange={({ target }) => setUsername(target.value)} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)} />
              <Button
                color='teal'
                fluid size='large'
                type="submit"> Sign in
              </Button>
            </Segment>
          </Form>
          <Message> New to us? <a href='/signup'>Sign Up</a></Message>
        </Grid.Column>
      </Grid>
    </ResponsiveContainer>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setTimedNotification,
  setUser,
  getBlogs
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(SignInForm)
export default ConnectedLoginForm