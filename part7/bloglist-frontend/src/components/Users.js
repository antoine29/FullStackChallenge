import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import usersService from '../services/users'

const User = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService
            .getAll()
            .then(_users => setUsers(_users))
    }, [])

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                </thead>
                <tbody>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default User