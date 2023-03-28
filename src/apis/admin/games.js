import client from '../http-client';

const httpClient = client();

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const fetchGamesApi = function (options = {}) {
    return httpClient.get(`${BASE_API_URL}/games`, options);
}

export const addGameApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/games`, data, options);
}

export const getGameApi = function (game_id, options = {}) {
    return httpClient.get(`${BASE_API_URL}/games/${game_id}`, options);
}

export const editGameApi = function (game_id, data, options = {}) {
    return httpClient.put(`${BASE_API_URL}/games/${game_id}`, data, options);
}

export const deleteGameApi = function (game_id, options = {}) {
    return httpClient.delete(`${BASE_API_URL}/games/${game_id}`, options);
}
