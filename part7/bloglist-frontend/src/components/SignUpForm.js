import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { SignUp } from '../services/auth'
import { setUser } from '../reducers/userReducer'
import { setTimedNotification } from '../reducers/notificationReducer'
import ResponsiveContainer from './ResponsiveContainer'
import { checkUserInLocalStorage } from './utils/utils'

const SignUpForm = ({ user, setUser, setTimedNotification }) => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (checkUserInLocalStorage() || user) history.push('/blogs')
  }, [user])

  const signUpUser = async event => {
    event.preventDefault()
    try {
      const user = await SignUp({ username, password })

      // ToDo: function shareable to set an user (into localStorage and into redux store)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      history.push('/blogs')
    }
    catch (exception) {
      setTimedNotification({ type: 'ERROR', message: 'Error creating user' }, 5000)
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
            {/* ToDo: validation for this form */}
            BlogList Sign Up
          </Header>
          <Form size='large' onSubmit={signUpUser}>
            <Segment stacked>
              <Form.Input
                fluid icon='user name'
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
                type="submit">Sign up
              </Button>
            </Segment>
          </Form>
          <Message> Already registered? <a href='/signin'>Sign In</a></Message>
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
  setUser
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
export default ConnectedLoginForm