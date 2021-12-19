import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import ResponsiveContainer from '../ResponsiveContainer'

const UserForm = ({onSubmitUser, mode}) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  if(mode === 'Sign In' || mode === 'Sign Up'){
    return (
      <ResponsiveContainer>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              {/* <Image src='/logo.png' /> */}
              BlogList {mode}
            </Header>
            {/* ToDo: validation for this form */}
            <Form size='large' onSubmit={(event) => {
              event.preventDefault()
              onSubmitUser(user, password)
            }}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='User'
                  value={user}
                  onChange={({ target }) => setUser(target.value)} />
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
                  fluid
                  size='large'
                  type="submit"> {mode}
                </Button>
              </Segment>
            </Form>
            {mode === "Sign In" ?
            <Message>New to us? <a href='/signup'>Sign Up</a></Message> :
            <Message>Already registered? <a href='/signin'>Sign In</a></Message>}
          </Grid.Column>
        </Grid>
      </ResponsiveContainer>
    )
  }
}

export default UserForm