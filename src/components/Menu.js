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
import { AppBar, Toolbar, Button } from '@material-ui/core'
import SignupForm from './SignupForm'


const Menu = () => {

    const categories = useSelector(({ categories }) => {
        return categories
    })

    const currentUser = useSelector(({ currentUser }) => {
        return currentUser
    })


    return (
        <div>

            <AppBar style={{ backgroundColor: "orange" }}>
                <Toolbar>
                    <Button>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button>
                        <Link to="/categories">Categories</Link>
                    </Button>

                    <Button>
                        <Link to="/items">Products</Link>
                    </Button>

                    {!currentUser &&
                        <Button>
                            <Link to="/signup">Sign Up to place orders!</Link>
                        </Button>
                    }



                    {currentUser &&
                        <Button>
                            <Link to="/my-orders">My-orders</Link>
                        </Button>
                    }

                    {currentUser &&
                        <Link to="/cart">Cart</Link>
                    }

                    {currentUser && currentUser.admin === true &&
                        <Link to="/users">User Management</Link>
                    }
                </Toolbar>
            </AppBar>


            <Switch>
                <Route path="/signup">
                    <SignupForm />
                </Route>
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