import client from '../http-client';

const httpClient = client();

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const fetchGamesApi = function (data, options = {}) {
    return httpClient.get(`${BASE_API_URL}/games`, data, options);
}
