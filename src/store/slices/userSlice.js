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
export const userSelector = state => state.user.user
export const isAdminSelector = state => state.user?.user?.isAdmin


/*  action creators */
export const setUser = payload => {
    return {
        type: 'user/setUser',
        payload: payload
    }
}
