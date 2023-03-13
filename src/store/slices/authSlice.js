const initialState = {
    id: null,
    isLoggedIn: false,
    token: null,
}

export function authReducer(state = initialState, action){
    switch(action.type) {
        case 'auth/loggedIn': {
            return {
                isLoggedIn: true,
                ...action.payload
            }
        }
        case 'auth/loggedOut': {
            return {
                id: null,
                isLoggedIn: false,
                token: false,
            }
        }
        case 'auth/setToken': {
            return {
                ...state,
                token: action.payload
            }
        }
        default:
            return state
    }
}


/*  getters */
export const selectAuthId = state => state.id
export const isLoggedIn = state => state.isLoggedIn
export const selectAuthToken = state => state.token



/*  action creators */
export const loggedIn = payload => {
    return {
        type: 'auth/loggedIn',
        payload: payload
    }
}

export const loggedOut = payload => {
    return {
        type: 'auth/loggedOut',
    }
}

export const setToken = payload => {
    return {
        type: 'auth/setToken',
        payload: payload
    }
}
