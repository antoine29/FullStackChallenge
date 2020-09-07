import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import { getBlogs } from '../reducers/blogsReducer'
import ResponsiveContainer from './ResponsiveContainer'

const LoginForm = ({ user, setUser, setTimedNotification, getBlogs }) => {
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON || user) history.push('/blogs')
  }, [user])

  const loginUser = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      getBlogs()
    }
    catch (exception) {
      setTimedNotification({type: 'ERROR', message: 'Wrong credentials'}, 5000)
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
            BlogList Log-in
          </Header>
          <Form size='large' onSubmit={loginUser}>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='User'
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
                type="submit">
                Login
          </Button>
            </Segment>
          </Form>
          {/* <Message> New to us? <a href='#'>Sign Up</a></Message> */}
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

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm