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

