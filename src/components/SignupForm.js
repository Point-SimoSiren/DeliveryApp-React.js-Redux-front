import React, { useState } from 'react'
import { createAction } from '../reducers/userReducer'
import { positiveAction, negativeAction } from '../reducers/positivityReducer'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

const SignupForm = () => {
    const dispatch = useDispatch()

    const addUser = (event) => {
        event.preventDefault()
        let newUser = {
            username: newUsername,
            password: newPassword,
            name: newName,
            address: newAddress,
            phone: newPhone,
            email: newEmail,
            admin: false,
        }
        try {

            dispatch(createAction(newUser))
            dispatch(positiveAction())
            dispatch(notificationAction(`Welcome to use your new ${newUsername} account`))
            setTimeout(() => {
                dispatch(notificationAction('You can now log in and place your first order.'))
            }, 4000)
            setTimeout(() => {
                dispatch(emptyAction())
            }, 4000)
        }
        catch {
            dispatch(negativeAction())
            dispatch(notificationAction('error happened'))
            setTimeout(() => {
                dispatch(emptyAction())
            }, 3000)
        }
        finally {
            setNewUsername('')
            setNewPassword('')
            setNewName('')
            setNewAddress('')
            setNewPhone('')
            setNewEmail('')
        }
    }

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newEmail, setNewEmail] = useState('')

    return (
        <form onSubmit={addUser}>
            <div>
                username: <input type="text" value={newUsername} name="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                password: <input type="password" value={newPassword} name="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            <div>
                name: <input type="text" value={newName} name="Name"
                    onChange={({ target }) => setNewName(target.value)} />
            </div>
            <div>
                address: <input type="text" value={newAddress} name="Address"
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
                phone: <input type="text" value={newPhone} name="Phone"
                    onChange={({ target }) => setNewPhone(target.value)} />
            </div>
            <div>
                email: <input type="email" value={newEmail} name="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>

            <div>
                <Button type="submit">create account</Button>
            </div>
        </form>
    )
}

export default SignupForm