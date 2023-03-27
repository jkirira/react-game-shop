import { createSelector } from "reselect";

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
        case 'categories/removeCategory': {
            let filteredCategories = state.categories.filter(category => category.id !== action.payload);
            return {
                ...state,
                categories: filteredCategories,
            }
        }
        case 'categories/addCategory': {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        }
        case 'categories/editCategory': {
            let categories = state.categories.map(category => {
                if (category.id !== action.payload.id) {
                    return category;
                } else {
                    return {...category, ...action.payload.data};
                } 
            })
            return {
                ...state,
                categories: categories
            }
        }
        default: {
            return state
        }
    }
}


// selectors
export const categoriesSelector = createSelector(
    // First, pass one or more "input selector" functions:
    state => state.categories.categories,
    // Then, an "output selector" that receives all the input results as arguments
    // and returns a final result value
    categories => categories
);
  
  
export const categoriesSelectorById = (state, categoryId) => {
    return state.categories.categories.find(category => category.id == categoryId);
}


// action creators
export const setCategories = payload => {
    return {
        type: 'categories/setCategories',
        payload: payload
    }
}

export const addCategory = payload => {
    return {
        type: 'categories/addCategory',
        payload: payload
    }
}

export const editCategory = payload => {
    return {
        type: 'categories/editCategory',
        payload: payload
    }
}

export const removeCategory = payload => {
    return {
        type: 'categories/removeCategory',
        payload: payload
    }
}

