import React, { useEffect } from 'react'
import { notificationAction, emptyAction } from '../reducers/notificationReducer'
import { positiveAction, negativeAction } from '../reducers/positivityReducer'
import { initItemsAction, removeAction } from '../reducers/itemReducer'
import { useDispatch, useSelector } from 'react-redux'
import itemService from '../services/items'

const Items = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initItemsAction())
    }, [dispatch])

    const items = useSelector(({ items }) => {
        return items
    })

    const handleDeleteClick = id => {
        const itemToRemove = items.find(i => i.id === id)

        if (window.confirm(`Removing ${itemToRemove.name}. Are you sure? `)) {
            itemService
                .remove(id)
                .then(promise => {
                    dispatch(removeAction(items.filter(filtered => filtered.id !== id)))
                    if (promise.status === 204) {
                        dispatch(positiveAction())
                        dispatch(notificationAction(`${itemToRemove.name} was deleted from the database.`))
                        setTimeout(() => {
                            dispatch(emptyAction())
                            dispatch(initItemsAction())
                        }, 3000)
                    }
                })
                .catch(error => {
                    dispatch(negativeAction())
                    console.log('Palvelimen palauttama error: ', error.response.data)
                    dispatch(notificationAction(
                        ` ${error.response.data} OR ${itemToRemove.name} may not have been deleted due unexpected error. Pls. check.`
                    ))
                    setTimeout(() => {
                        dispatch(emptyAction)
                    }, 4000)
                })
        }
    }

    if (!items) {
        return (<h3>Loading items...</h3>)
    }
    else {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th><th>Package</th><th>Price</th>
                            <th>Manufacturer</th><th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(i =>
                                <tr key={i.id}>
                                    <td>{i.name}</td>
                                    <td>{i.package}</td>
                                    <td>{i.price}</td>
                                    <td>{i.manufacturer}</td>
                                    <td>{i.description}</td>
                                    <button style={{ height: '30px', width: '70px' }}
                                        onClick={() => handleDeleteClick(i.id)}>Delete</button>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }

}
export default Items