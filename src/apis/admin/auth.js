import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const loginApi = function (data, options = {}) {
    return axios.post(`${BASE_API_URL}/login`, data, options);
}
