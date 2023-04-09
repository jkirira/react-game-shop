import axios from 'axios';
import { getFromLocalStorage } from '../helpers';

let client = () => {
    let auth_token = getFromLocalStorage('token');

    return axios.create({
                headers: {
                    'Authorization': auth_token,
                }
            });
}

export default client;
