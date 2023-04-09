import { createSelector } from "reselect";
import { fetchGamesApi } from "../../apis/admin/games";
import { toastNotifyError } from "../../helpers";

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
        case 'games/addGame': {
            return {
                ...state,
                games: [...state.games, action.payload],
            }
        }
        case 'games/editGame': {
            let games = state.games.map(game => {
                if(game.id !== action.payload.id){
                    return game;
                } else {
                    return {...game, ...action.payload.data};
                }
            });
            return {
                ...state,
                games: games,
            }
        }
        case 'games/removeGame': {
            let filteredGames = state.games.filter(game => game.id !== action.payload)
            return {
                ...state,
                games: filteredGames,
            }
        }
        default: {
            return state
        }
    }
}

//thunk
export async function fetchGames(dispatch, getState) {
    await fetchGamesApi()
            .then(response => {
                dispatch(setGames(response.data.data));
            })
            .catch(error => {
                console.log(error);
                toastNotifyError('Something went wrong. Could not fetch games.');
            });
}


// selectors
export const gamesSelector = createSelector(
    state => state.games.games,
    games => games
);

export const gamesSelectorById = (state, id) => {
    return state.games?.games?.find(game => game.id == id);
};


// action creators
export const setGames = payload => {
    return {
        type: 'games/setGames',
        payload: payload
    }
}

export const addGame = payload => {
    return {
        type: 'games/addGame',
        payload: payload
    }
}

export const editGame = payload => {
    return {
        type: 'games/editGame',
        payload: payload
    }
}

export const removeGame = payload => {
    return {
        type: 'games/removeGame',
        payload: payload
    }
}
