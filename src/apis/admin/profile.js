import client from '../http-client';

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const updateProfileApi = function (user_id, data, options = {}) {
    return client().post(`${BASE_API_URL}/profile/${user_id}`, data, options);
}
