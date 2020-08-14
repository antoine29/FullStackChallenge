import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import usersService from '../services/users'
import { Header, Table } from 'semantic-ui-react'

const User = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService
            .getAll()
            .then(_users => setUsers(_users))
    }, [])

    return (
            <Table unstackable={false} style={{height: '100vh'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Posted blogs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {users.map(user =>
                        <Table.Row key={user.id}>
                            <Table.Cell>
                                <Header as='h4'>
                                    <Header.Content>
                                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{user.blogs.length}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
    )
}

export default User