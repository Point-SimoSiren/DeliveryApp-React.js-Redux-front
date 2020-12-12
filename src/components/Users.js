import React from 'react'
import { useSelector } from 'react-redux'
import {
    Link
} from "react-router-dom"

const Users = () => {

    const users = useSelector(({ users }) => {
        return users
    })

    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th><th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <Link to={`/users/${user.id}`}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                </Link>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
export default Users