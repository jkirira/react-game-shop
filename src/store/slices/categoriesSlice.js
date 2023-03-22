const initialState = {
    categories: []
}

export function categoriesReducer(state = initialState, action) {
    switch(action.type) {
        case 'categories/setCategories': {
            return {
                ...state,
                categories: action.payload,
            }
        }
        default: {
            return state
        }
    }
}


// selectors
export const categoriesSelector = state => state.categories.categories;


// action creators
export const setCategories = payload => {
    return {
        type: 'categories/setCategories',
        payload: payload
    }
}

