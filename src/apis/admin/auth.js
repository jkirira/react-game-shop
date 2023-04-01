import client from '../http-client';

const BASE_API_URL = import.meta.env.VITE_API_URL + '/admin';

export const loginApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/login`, data, options);
}

export const forgotPasswordApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/forgot-password`, data, options);
}

export const confirmPasswordResetApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/confirm-password-reset`, data, options);
}

export const passwordResetApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/password-reset`, data, options);
}

export const authUserApi = function (data, options = {}) {
    return client().post(`${BASE_API_URL}/auth/user`, data, options);
}
