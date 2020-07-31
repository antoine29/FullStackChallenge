import React from 'react'
import {
    Switch, Route, BrowserRouter as Router
} from "react-router-dom"
import App from './App'
import Header from './components/Header'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'

const AppRouter = () => {
    return(
        <Router>
            <Header />
            <Notification />
            <Switch>
                <Route path='/login'>
                    <Togglable buttonLabel='log in'>
                        <LoginForm />
                    </Togglable>
                </Route>
                <Route path='/users/:id'>
                    <User />
                </Route>
                <Route path='/users'>
                    <Users />
                </Route>
                <Route path='/'>
                    <App />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter