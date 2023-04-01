import client from '../http-client';

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const dashboardApi = function (options = {}) {
    return client().get(`${BASE_API_URL}/dashboard`, options);
}
