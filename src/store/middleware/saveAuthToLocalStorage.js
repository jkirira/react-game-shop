import { clearLocalStorage, saveToLocalStorage } from "../../helpers";

const saveAuthToLocalStorage = storeApi => next => action => {

    if (action.type === 'auth/loggedIn') {
        saveToLocalStorage('token', action.payload?.token);
        saveToLocalStorage('isAdmin', action.payload?.isAdmin);
        saveToLocalStorage('id', action.payload?.id);

    } else if (action.type === 'auth/setToken') {
        let token = action.payload;
        saveToLocalStorage('token', token);

    } else if (action.type === 'auth/loggedOut') {
        clearLocalStorage();
    }

    return next(action);
    
}

export default saveAuthToLocalStorage;
