import React from 'react'
import Categories from './Categories'
import UserDetails from './UserDetails'
import { useSelector } from 'react-redux'
import '../index.css'
import Users from './Users'
import {
    Switch,
    Route,
    Link
} from "react-router-dom"
import { AppBar, Toolbar, Typography } from '@material-ui/core'


const Menu = () => {

    const categories = useSelector(({ categories }) => {
        return categories
    })

    const currentUser = useSelector(({ currentUser }) => {
        return currentUser
    })


    return (
        <div>
            <AppBar position="static" color='orange'>
                <Toolbar>
                    <Typography variant="h4"><Link to="/categories">Categories</Link>
                    </Typography>

                    <Typography variant="h4"><Link to="/items">Products</Link>
                    </Typography>

                    {currentUser &&
                        <Typography variant="h4"><Link to="/my-orders">My-orders</Link>
                        </Typography>}

                    {currentUser &&
                        <Typography variant="h4"><Link to="/cart">Cart</Link>
                        </Typography>}

                    {currentUser && currentUser.admin === true &&
                        <Typography variant="h4"><Link to="/users">User Management</Link>
                        </Typography>}
                </Toolbar>
            </AppBar>

            <Switch>
                <Route path="/categories">
                    <Categories categories={categories} />
                </Route>
                <Route path="/items">
                    <Categories categories={categories} />
                </Route>
                <Route path="/orders">
                    <Categories categories={categories} />
                </Route>
                <Route path="/cart">
                    <Categories categories={categories} />
                </Route>
                {currentUser && currentUser.admin === true &&
                    <Route path="/users">
                        <Users />
                    </Route>}

            </Switch>

        </div>
    )
}

export default Menu