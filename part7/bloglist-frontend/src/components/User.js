import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from "react-router-dom"
import { Header, Container, List } from 'semantic-ui-react'
import usersService from '../services/users'
import ResponsiveContainer from './ResponsiveContainer'

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
    })

    return(
        user ?
        <ResponsiveContainer>
            <Container style={{height: '100vh'}}>
                <Header>{user.name}</Header>
                <Header.Subheader>Added blogs:</Header.Subheader>
                <ul>
                <List divided relaxed>
                {
                    user.blogs.map(blog =>
                        <List.Item key={blog.id}>
                            <List.Content>
                                <List.Header>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    )
                }
                </List>
                </ul>
            </Container>
        </ResponsiveContainer> :
        null
    )
}

export default User