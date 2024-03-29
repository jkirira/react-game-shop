import client from '../http-client';

const httpClient = client();

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const loginApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/login`, data, options);
}

export const signUpApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/sign-up`, data, options);
}

export const forgotPasswordApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/forgot-password`, data, options);
}

export const emailConfirmationApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/confirm-email`, data, options);
}

export const completeRegistrationApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/complete-registration`, data, options);
}

export const confirmPasswordResetApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/confirm-password-reset`, data, options);
}

export const passwordResetApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/password-reset`, data, options);
}

export const authUserApi = function (data, options = {}) {
    return httpClient.post(`${BASE_API_URL}/auth/user`, data, options);
}
