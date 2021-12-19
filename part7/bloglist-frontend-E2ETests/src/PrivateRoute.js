import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()

  const storeUser = useSelector(state => state.user)
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

  const isUserSigned = () => {
    if (storeUser) return true

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      return true
    }

    return false
  }

  // ToDo: in case of not signed show notification
  return (
    <Route
      {...rest}
      render={props =>
        isUserSigned() ?
          (<Component {...props} />) :
          (<Redirect to="/signin" />)
      }
    />
  )
}

export default PrivateRoute