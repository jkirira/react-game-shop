import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import saveAuthToLocalStorage from './middleware/saveAuthToLocalStorage.js';
import rootReducer from './rootReducer';


/*  A store enhancer customize the store's abilities changing how the store behaves
    Redux middleware are implemented on top of a store enhancer applyMiddleware.
    Multiple enhancers can be merged together using the compose API
    The store needs the DevTools enhancer added, using composeWithDevTools
*/

const middlewareEnhancer = applyMiddleware(saveAuthToLocalStorage);

const composedEnhancer = composeWithDevTools(
    middlewareEnhancer
    // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
