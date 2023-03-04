import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000/api';

export const loginApi = function (data, options = {}) {
    return axios.post(`${BASE_API_URL}/login`, data, options);
}

export const signUpApi = function (data, options = {}) {
    return axios.post(`${BASE_API_URL}/sign-up`, data, options);
}

export const forgotPasswordApi = function (data, options = {}) {
    return axios.post(`${BASE_API_URL}/forgot-password`, data, options);
}

export const emailConfirmationApi = function (data, options = {}) {
    return axios.post(`${BASE_API_URL}/confirm-email`, data, options);
}
