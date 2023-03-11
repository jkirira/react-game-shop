const initialState = {
    user: null
}

export function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'user/setUser': {
            return {
                ...state,
                user: action.payload
            }
        }
        default: {
            return state
        }
    }
}


/*  getters */
export const stateUser = store => store.user


/*  action creators */
export const setUser = payload => {
    return {
        type: 'user/setUser',
        payload: payload
    }
}
