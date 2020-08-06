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
import ResponsiveContainer from './components/ResponsiveContainer'

const AppRouter = () => {
    return(
        <Router>
            <Notification />
            {/* <Header /> */}
            <Switch>
                <Route path='/login'>
                    <LoginForm />
                </Route>
                <Route path='/users/:id'>
                    <ResponsiveContainer>
                        <User />
                    </ResponsiveContainer>
                </Route>
                <Route path='/users'>
                    <ResponsiveContainer>
                        <Users />
                    </ResponsiveContainer>
                </Route>
                <Route path='/blogs/:id'>
                    <ResponsiveContainer>
                        <Blog />
                    </ResponsiveContainer>
                </Route>
                <Route path='/'>
                    <ResponsiveContainer>
                        <App />
                    </ResponsiveContainer>
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter