const initialState = {
    games: []
}

export function gamesReducer(state = initialState, action) {
    switch(action.type) {
        case 'games/setGames': {
            return {
                ...state,
                games: action.payload,
            }
        }
        default: {
            return state
        }
    }
}


// selectors
export const gamesSelector = state => state.games.games;


// action creators
export const setGames = payload => {
    return {
        type: 'games/setGames',
        payload: payload
    }
}

