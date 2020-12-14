import React, { useEffect } from 'react'
import categoriesService from './services/categories'
import Notification from './components/Notification'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Togglable from './components/Togglable'
import { setCurrentUserAction, logoutAction } from './reducers/currentUserReducer'
import { notificationAction, emptyAction } from './reducers/notificationReducer'
import { positiveAction } from './reducers/positivityReducer'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { Container, Button } from '@material-ui/core'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUserAction(currentUser))
      categoriesService.setToken(currentUser.token)
    }
  }, [dispatch])


  //--- LOGOUT-HANDLER--

  const handleLogOut = () => {
    localStorage.clear()
    dispatch(logoutAction())
    dispatch(positiveAction())
    dispatch(notificationAction('Logout was succesfull!'))

    setTimeout(() => {
      dispatch(emptyAction())
      window.location.reload()
    }, 3000)
  }

  const currentUser = useSelector(({ currentUser }) => {
    return currentUser
  })

  // APP.js renders to screen when not logged in

  if (!currentUser) {
    return (
      <div>
        <Container>
          <h1>Delivery service</h1>
          <Togglable buttonLabel='login'>
            <LoginForm />
          </Togglable>
          <Togglable buttonLabel='signup'>
            <SignupForm />
          </Togglable>

          <Menu />
          <Notification />
        </Container>
      </div>
    )
  }
  //---------------RENDER-WHEN-USER-IS-LOGGED-IN----------------
  else {
    return (
      <Container>
        <h1>Delivery service</h1>

        <p>Welcome {currentUser.name}
          <Button style={{ width: "150px", height: "30px", marginLeft: "300px" }}
            onClick={handleLogOut} >
            LOGOUT
          </Button></p>
        <Menu />
        <Notification />
      </Container>
    )
  }
}

export default App