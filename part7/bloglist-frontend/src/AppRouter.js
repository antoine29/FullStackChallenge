import React from 'react'
import {
    Switch, Route, BrowserRouter as Router
} from "react-router-dom"
import App from './App'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Header from './components/Header'

const AppRouter = () => {
    return(
        <Router>
            <Notification />
            <Header />
            <Switch>
                <Route path='/login'>
                    <LoginForm />
                </Route>
                <Route path='/users/:id'>
                    <User />
                </Route>
                <Route path='/users'>
                    <Users />
                </Route>
                <Route path='/blogs/:id'>
                    <Blog />
                </Route>
                <Route path='/'>
                    <App />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter