import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
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
        <PrivateRoute path='/blogs' component={Blogs}/>
        <PrivateRoute path='/blogs/:id' component={FullBlog}/>
        <PrivateRoute path='/blogs' component={Blogs}/>
        <Route>
          <Redirect to='/blogs' />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter