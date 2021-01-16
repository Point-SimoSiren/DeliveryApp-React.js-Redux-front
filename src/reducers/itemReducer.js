import itemService from '../services/items'

const itemReducer = (state = [], action) => {
    let newState = [...state]
    switch (action.type) {

        case 'INITIALS':
            return action.payload
        default: return state

        case 'CREATE':
            return newState.concat(action.payload)

        case 'REMOVE':
            return newState.concat(action.payload)

        /*case 'UPDATE':
            const id = action.payload.id
            const found = newState.findIndex((item) => {
                return item.id === id
            })
            newState[found].likes = newState[found].likes + 1
            return newState
            */
    }
}

//------------------ACTION-CREATORS-------------------

export const createAction = submitted => {
    return async dispatch => {
        const newItem = await itemService.create(submitted)
        dispatch({
            type: 'CREATE',
            payload: newItem
        })
    }
}

export const removeAction = (id) => {
    return dispatch => {
        dispatch({
            type: 'REMOVE',
            payload: {
                id: id
            }
        })
    }
}

export const initItemsAction = () => {
    return async dispatch => {
        const items = await itemService.getAll()
        dispatch({
            type: 'INITIALS',
            payload: items
        })
    }
}

/*
export const likeAction = (item) => {
    return dispatch => {
        itemService.update(item.id, item)
        dispatch({
            type: 'UPDATE',
            payload: {
                id: item.id,
                item: item
            }
        })
    }
}
*/

export default itemReducer