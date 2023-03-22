import client from '../http-client';

const httpClient = client();

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const fetchCategoriesApi = function (data, options = {}) {
    return httpClient.get(`${BASE_API_URL}/categories`, data, options);
}

export const addCategoryApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/categories`, data, options);
}
