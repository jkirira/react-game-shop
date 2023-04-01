import client from '../http-client';

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const fetchGamesApi = function (options = {}) {
    return client().get(`${BASE_API_URL}/games`, options);
}

export const addGameApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/games`, data, options);
}

export const getGameApi = function (game_id, options = {}) {
    return client().get(`${BASE_API_URL}/games/${game_id}`, options);
}

export const editGameApi = function (game_id, data, options = {}) {
    return client().put(`${BASE_API_URL}/games/${game_id}`, data, options);
}

export const deleteGameApi = function (game_id, options = {}) {
    return client().delete(`${BASE_API_URL}/games/${game_id}`, options);
}
