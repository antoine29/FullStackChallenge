import React from 'react'
import {
    Switch, Route, BrowserRouter as Router
} from "react-router-dom"
import App from './App'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import FullBlog from './components/FullBlog'
import ResponsiveContainer from './components/ResponsiveContainer'

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path='/login'>
                    <ResponsiveContainer>
                        <LoginForm />
                    </ResponsiveContainer>
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
                        <FullBlog />
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