import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom"
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import FullBlog from './components/FullBlog'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path='/login'>
                    <LoginForm />
                </Route>
                <PrivateRoute path='/users/:id' component={User}/>
                <PrivateRoute path='/users' component={Users}/>
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