import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignUp } from '../../services/auth'
import { setUser } from '../../reducers/userReducer'
import { setTimedNotification } from '../../reducers/notificationReducer'
import { getUserFromLocalStorage, setUserToLocalStorage } from '../../utils/utils'
import UserForm from './UserForm'

const SignUpForm = ({ user, setUser, setTimedNotification }) => {
  const history = useHistory()
  useEffect(() => {
    if (!!getUserFromLocalStorage() || user) history.push('/blogs')
  }, [user])

  const signUpUser = async (user, password) => {
    try {
      const createdUser = await SignUp({ username: user, password })
      setUserToLocalStorage(createdUser)
      setUser(createdUser)
      history.push('/blogs')
    }
    catch (exception) {
      setTimedNotification({ type: 'ERROR', message: 'Error creating user' }, 5000)
    }
  }

  return (
    <UserForm onSubmitUser={signUpUser} mode="Sign Up"/>
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
