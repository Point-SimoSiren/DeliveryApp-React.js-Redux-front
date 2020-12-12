import React from 'react'

const UserDetails = ({ user }) => {
    return (
        <>
            <h3>{user.admin === true ? "Staff member" : "Customer"}</h3>
            <h2>{user.name}</h2>
            <h4>{user.address}</h4>
            <h4>{user.phone}</h4>
            <h4>{user.email}</h4>
            <h4>Username: {' '} {user.username}</h4>
            <button>Orders made by {' '} {user.name}</button>
        </>
    )
}
export default UserDetails