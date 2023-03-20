import axios from 'axios';
import { getFromLocalStorage } from '../helpers';

let auth_token = getFromLocalStorage('token');

let client = () => {
    auth_token = auth_token ?? getFromLocalStorage('token');

    return axios.create({
                headers: {
                    'Authorization': auth_token,
                }
            });
}


export default client;
