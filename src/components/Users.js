import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsersAction } from '../reducers/userReducer'
import usersService from '../services/users'
import UserDetails from './UserDetails'

const Users = () => {

    const [showDetailsId, setShowDetailsId] = useState(0)

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
            <h2>Click user to see details</h2>
            {
                users.map(user =>
                    <div key="user.id">
                        {showDetailsId === user.id && <button onClick={() => setShowDetailsId(0)}>Hide details</button>}
                        <h4 onClick={() => setShowDetailsId(user.id)}>
                            {showDetailsId !== user.id && user.name}
                            {showDetailsId === user.id && <UserDetails user={user} setShowDetailsId={setShowDetailsId} />}
                        </h4>
                    </div>
                )
            }
        </>
    )
}
export default Users