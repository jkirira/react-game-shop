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
export const authIdSelector = state => state.auth.id
export const isLoggedInSelector = state => state.auth.isLoggedIn
export const authTokenSelector = state => state.auth.token



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
