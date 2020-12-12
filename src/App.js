import React, { useEffect } from 'react'
import Categories from './components/Categories'
import User from './components/User'
import categoriesService from './services/categories'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import { setCurrentUserAction, logoutAction } from './reducers/currentUserReducer'
import { initUsersAction } from './reducers/userReducer'
import { notificationAction, emptyAction } from './reducers/notificationReducer'
import { positiveAction } from './reducers/positivityReducer'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import Users from './components/Users'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"
import { Container, Button, AppBar, Toolbar, Typography } from '@material-ui/core'

// APP COMPONENT IS DEFINED BELOW MENU

const Menu = () => {

  const categories = useSelector(({ categories }) => {
    return categories
  })

  const users = useSelector(({ users }) => {
    return users
  })

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null


  return (
    <div>
      <AppBar position="static" color='orange'>
        <Toolbar>
          <Typography variant="h4"><Link to="/users">Users</Link>
          </Typography>
          <span style={{ width: 20 }} />
          <Typography variant="h4"><Link to="/categories">Product categories</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>

        <Route path="/users/:id">
          <User user={user} />
        </Route>

        <Route path="/users">
          <Users />
        </Route>

        <Route path="/categories">
          <Categories categories={categories} />
        </Route>

      </Switch>

    </div>
  )
}

// APP COMPONENT

const App = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initUsersAction())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUserAction(currentUser))
      categoriesService.setToken(currentUser.token)
    }
  }, [dispatch])


  const currentUser = useSelector(({ currentUser }) => {
    return currentUser
  })




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

  // APP.js renders to screen when not logged in

  if (!currentUser) {
    return (
      <div>

        <h1>Delivery service</h1>

        <Togglable buttonLabel='login'>
          <LoginForm />
        </Togglable>
        <Notification />
      </div>
    )
  }
  //---------------RENDER-WHEN-USER-IS-LOGGED-IN----------------
  else {
    return (
      <Container>
        <h1>Bloglist</h1>

        <p>Logged in as {currentUser.username}
          <Button style={{ width: "150px", height: "30px", marginLeft: "300px" }}
            onClick={handleLogOut} >
            LOGOUT
          </Button></p>
        <Notification />
        <Menu />
      </Container>
    )
  }
}

export default App