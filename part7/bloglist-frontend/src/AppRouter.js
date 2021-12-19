import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignInForm from './components/SignForms//SignInForm'
import SignUpForm from './components/SignForms/SignUpForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import FullBlog from './components/FullBlog'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
  return(
    <Router>
      <Switch>
        <Route path='/signin'>
          <SignInForm />
        </Route>
        <Route path='/signup'>
          <SignUpForm />
        </Route>
        <PrivateRoute path='/blogs/:id' component={FullBlog}/>
        <Route path='/blogs'>
          <Blogs />
        </Route>
        <PrivateRoute path='/users/:id' component={User}/>
        <PrivateRoute path='/users' component={Users}/>
        <Route>
          <Redirect to='/blogs' />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter