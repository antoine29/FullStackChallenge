import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { SignIn } from '../../services/auth'
import { setUser } from '../../reducers/userReducer'
import { setTimedNotification } from '../../reducers/notificationReducer'
import { getBlogs } from '../../reducers/blogsReducer'
import { getUserFromLocalStorage, setUserToLocalStorage } from '../../utils/utils'
import UserForm from './UserForm'

const SignInForm = ({ user, setUser, setTimedNotification, getBlogs }) => {
  const history = useHistory()
  
  useEffect(() => {
    if (!!getUserFromLocalStorage() || user) history.push('/blogs')
  }, [user])

  const signInUser = async (user, password) => {
    try {
      const signedUser = await SignIn({ username: user, password })
      setUserToLocalStorage(signedUser)
      setUser(signedUser)
      getBlogs()
    }
    catch (exception) {
      setTimedNotification({ type: 'ERROR', message: 'Wrong credentials' }, 5000)
    }
  }

  return (
    <UserForm onSubmitUser={signInUser} mode="Sign In"/>
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
