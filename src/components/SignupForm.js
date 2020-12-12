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
        <form onSubmit={addBlog}>
            <div>
                title: <input type="text" value={newTitle} name="Title"
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                author: <input type="text" value={newAuthor} name="Author"
                    onChange={({ target }) => setNewAuthor(target.value)} />
            </div>
            <div>
                url: <input type="link" value={newUrl} name="URL"
                    onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            <div>
                <Button type="submit">add</Button>
            </div>
        </form>
    )
}

export default SignupForm