import categoryService from '../services/categories'

const categoryReducer = (state = [], action) => {
    let newState = [...state]
    switch (action.type) {

        case 'INITIALS':
            return action.payload
        default: return state

        case 'CREATE':
            return newState.concat(action.payload)

        case 'REMOVE':
            return newState.concat(action.payload)

        case 'UPDATE':
            const id = action.payload.id
            const found = newState.findIndex((category) => {
                return category.id === id
            })
            newState[found].likes = newState[found].likes + 1
            return newState
    }
}

//------------------ACTION-CREATORS-------------------

export const createAction = submitted => {
    return async dispatch => {
        const newCategory = await categoryService.create(submitted)
        dispatch({
            type: 'CREATE',
            payload: newCategory
        })
    }
}

export const removeAction = (id) => {
    return dispatch => {
        categoryService.remove(id)
        dispatch({
            type: 'REMOVE',
            payload: {
                id: id
            }
        })
    }
}

export const likeAction = (category) => {
    return dispatch => {
        categoryService.update(category.id, category)
        dispatch({
            type: 'UPDATE',
            payload: {
                id: category.id,
                category: category
            }
        })
    }
}

export const initCategoriesAction = () => {
    return async dispatch => {
        const categories = await categoryService.getAll()
        dispatch({
            type: 'INITIALS',
            payload: categories
        })
    }
}

export default categoryReducer