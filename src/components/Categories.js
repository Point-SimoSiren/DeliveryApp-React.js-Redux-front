import React, { useEffect } from 'react'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'
import { positiveAction, negativeAction } from '../reducers/positivityReducer'
import { initCategoriesAction, removeAction } from '../reducers/categoryReducer'
import { useDispatch, useSelector } from 'react-redux'
import categoryService from '../services/categories'

const Categories = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initCategoriesAction())
    }, [dispatch])

    const categories = useSelector(({ categories }) => {
        return categories
    })

    const currentUser = useSelector(({ currentUser }) => {
        return currentUser
    })

    const handleDeleteClick = id => {
        const categoryToRemove = categories.find(c => c.id === id)

        if (window.confirm(`Removing ${categoryToRemove.name}. Are you sure? `)) {
            categoryService
                .remove(id)
                .then(promise => {
                    dispatch(removeAction(categories.filter(filtered => filtered.id !== id)))
                    if (promise.status === 204) {
                        dispatch(positiveAction())
                        dispatch(notificationAction(`${categoryToRemove.title} was deleted from the database.`))
                        setTimeout(() => {
                            dispatch(emptyAction())
                            dispatch(initCategoriesAction())
                        }, 3000)
                    }
                })
                .catch(error => {
                    dispatch(negativeAction())
                    console.log('Palvelimen palauttama error: ', error.response.data)
                    dispatch(notificationAction(
                        ` ${error.response.data} OR ${categoryToRemove.name} may not have been deleted due unexpected error. Pls. check.`
                    ))
                    setTimeout(() => {
                        dispatch(emptyAction)
                    }, 4000)
                })
        }
    }


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th><th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(c =>
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.description}</td>
                                {currentUser && currentUser.admin === true &&
                                    <button style={{ height: '30px', width: '70px' }}
                                        onClick={() => handleDeleteClick(c.id)}>Delete</button>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>)
}
export default Categories