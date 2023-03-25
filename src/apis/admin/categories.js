import client from '../http-client';

const httpClient = client();

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const fetchCategoriesApi = function (data, options = {}) {
    return httpClient.get(`${BASE_API_URL}/categories`, data, options);
}

export const addCategoryApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/categories`, data, options);
}

export const getCategoryApi = function (category_id, data, options = {}) {
    return httpClient.get(`${BASE_API_URL}/categories/${category_id}`, data, options);
}

export const editCategoryApi = function (category_id, data, options = {}) {
    return httpClient.put(`${BASE_API_URL}/categories/${category_id}`, data, options);
}

export const deleteCategoriesApi = function (category_id, data, options = {}) {
    return httpClient.delete(`${BASE_API_URL}/categories/${category_id}`, data, options);
}
