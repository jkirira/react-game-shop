import { toast } from "react-toastify";

export function toastNotify (message, options = {}) {
    let toast_message = message;
    let toast_type = options.type;

    if(!toast_message) {
        console.error('toast error', 'Empty Message');
        return null;
    }

    if(!toast_type) {
        toast_type = 'info';
    }

    return toast(toast_message, { type: toast_type, ...options });
}

export function toastNotifySuccess(message, extraOptions = {}) {
    return toastNotify(message, { type: 'success', ...extraOptions });
}

export function toastNotifyError(message, extraOptions = {}) {
    return toastNotify(message, { type: 'error', ...extraOptions });
}

export function getFromLocalStorage(key) {
    const localstorage_key = import.meta.env.VITE_LOCALSTORAGE_KEY || 'game_shop';
    let stringified_data = window.localStorage.getItem(localstorage_key);
    let data = stringified_data ? JSON.parse(stringified_data) : {};

    if(!key) {
        return data;
    } else {
        return data[key];
    }

}

export function saveToLocalStorage(key, payload) {
    if(!key) {
        return false;
    }

    let data = getFromLocalStorage();
    
    if (data) {
        data[key] = payload;
    } else {
        data = { [key]: payload }
    }
    

    const localstorage_key = import.meta.env.VITE_LOCALSTORAGE_KEY || 'game_shop';
    let stringified_data = JSON.stringify(data);
    window.localStorage.setItem(localstorage_key, stringified_data);

    return true;

}

export function clearLocalStorage() {
    const localstorage_key = import.meta.env.VITE_LOCALSTORAGE_KEY || 'game_shop';
    window.localStorage.removeItem(localstorage_key);
}
