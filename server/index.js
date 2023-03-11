import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { completeRegistration, confirmEmail, login, signUp } from './controllers/authController.js';

dotenv.config();

const port = process.env.PORT || 5000;

const APP_ENV = process.env.APP_ENV;


const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/test', async (req, res) => {
    // function to test server response here
    return res.status(204).json({});
})

app.post('/api/login', login)

app.post('/api/sign-up', signUp)

app.post('/api/confirm-email', confirmEmail)

app.post('/api/complete-registration', completeRegistration)

app.get('/*', (req, res) => {
    console.log('here');
    /*
    *
    * TODO: create 404 page
    * 
    * res.sendFile(path.resolve(__dirname) + '/index.html');
    * 
    */
    res.status(404).json({message: 'Unknown path'});
})


if(APP_ENV === 'local') {
    app.listen(port, () => {console.log(`server running at port ${port}`)});
}
