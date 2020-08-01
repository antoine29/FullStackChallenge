import React, { useEffect, useState } from 'react'
import { useRouteMatch } from "react-router-dom"
import usersService from '../services/users'

const User = () => {
    const [user, setUser] = useState(null)
    const userMatcher = useRouteMatch('/users/:id')
    
    useEffect(() => {
        const userId = userMatcher ?
            userMatcher.params.id : null
        usersService
            .getAll()
            .then(users => {
                const user = users.find(_user => _user.id === userId)
                setUser(user)
            })
    }, [])

    return(
        user ?
        <div>
            <h3>{user.name}</h3>
            <p>Added blogs:</p>
            <ul>
            {user.blogs.map(blog =>
                <li key={blog.id}>{blog.title}</li>
            )}
            </ul>
        </div> :
        null
    )
}

export default User