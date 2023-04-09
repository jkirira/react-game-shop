import client from '../http-client';

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const fetchCategoriesApi = function (data, options = {}) {
    return client().get(`${BASE_API_URL}/categories`, data, options);
}

export const addCategoryApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/categories`, data, options);
}

export const getCategoryApi = function (category_id, data, options = {}) {
    return client().get(`${BASE_API_URL}/categories/${category_id}`, data, options);
}

export const editCategoryApi = function (category_id, data, options = {}) {
    return client().put(`${BASE_API_URL}/categories/${category_id}`, data, options);
}

export const deleteCategoriesApi = function (category_id, data, options = {}) {
    return client().delete(`${BASE_API_URL}/categories/${category_id}`, data, options);
}
