import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsersAction } from '../reducers/userReducer'
import usersService from '../services/users'
import {
    Link
} from "react-router-dom"

const Users = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector(({ currentUser }) => {
        return currentUser
    })

    useEffect(() => {
        console.log(currentUser.token)
        usersService.setToken(currentUser.token)
        dispatch(initUsersAction())
    }, [dispatch])

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