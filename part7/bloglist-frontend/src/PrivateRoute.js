import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()

  const storeUser = useSelector(state => state.user)
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

  const isLogged = () => {
    if (storeUser) return true

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      return true
    }

    return false
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLogged() ?
          (<Component {...props} />) :
          (<Redirect to="/login" />)
      }
    />
  )
}

export default PrivateRoute