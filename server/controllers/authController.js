import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { formatDuration, formatISO9075 } from 'date-fns';

import sequelize from '../config/database.js';
import { sendEmailConfirmation } from '../controllers/mailController.js';
import { Client } from '../database/sequelize/models.js';


dotenv.config();


const login = function (req, res) {
    if( !!req.body.username || !!req.body.password ) {
        return res.status(400).json({type: 'error', message: "Please fill all values"});
    }
}

const signUp = async function (req, res) {
    let data = req.body;

    if( !data['email'] ) {
        return res.status(400).json({type: 'error', message: "Please fill all values"});
    }


    let existingUser = await Client.findOne({ where: { email: data['email'] } });

    if(!!existingUser) {
        return res.status(400).json({type: 'error', message: "That email is already taken!"});
    }

    const hours_to_expiry = 5;
    const confirmationToken = jwt.sign({ email: data['email'] }, process.env.JWT_TOKEN_SECRET, { expiresIn: (hours_to_expiry * 60 * 60) });

    const app_url = process.env.VITE_APP_URL;
    const email_confirmation_link = `${app_url}/confirm-email?token=${confirmationToken}`
    
    const mailOptions = {
        email_confirmation_link: email_confirmation_link,
        expiresAfter: formatDuration({ hours: hours_to_expiry }),
    }

    await sendEmailConfirmation(data['email'], mailOptions)
            .then(response => {
                return res.status(200).json({type: 'success', message: "An email confirmation email has been sent. Please confirm your email to continue."});
            })
            .catch(error => {
                return res.status(400).json({type: 'error', message: "Could not send confirmation email."});
            });

}

const confirmEmail = async (req, res) => {
    const token = req.body['token'];

    if (!token) {
       return res.status(400).json({type: 'error',  message: 'A Confirmation token must be provided.'});
    }

    let client_details = {};

    try {
        client_details = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    } catch(err) {
        let error_message = '';
        if(err.name == 'TokenExpiredError') {
            error_message = 'The token has expired. Please sign up again';
        } else {
            error_message = 'Invalid token';
        }
        return res.status(400).json({type: 'error',  message: error_message});

    }

    let existingUser = await Client.findOne({ where: { email: client_details.email } });

    if(!!existingUser) {
        return res.status(400).json({type: 'error', message: "That email is already confirmed!"});
    }

    return res.status(200).json({type: 'success',  message: 'Please complete registration to access your account.', data: { email: client_details.email }});

}

const completeRegistration = async (req, res) => {
    let data = req.body;

    if (!data['username'] || !data['email'] || !data['password']) {
       return res.status(400).json({type: 'error',  message: 'Please fill all values.'});
    }

    let existingUser = await Client.findOne({ where: { email: data['email'] } });

    if(!!existingUser) {
        return res.status(400).json({type: 'error', message: "That email is already taken!"});
    }

    const hashed_password = bcrypt.hashSync(data['password'], 10);

    await Client.create({
        username: data['username'],
        email: data['email'],
        password: hashed_password,
        last_login: formatISO9075(new Date()),
    })
    .then(client => {
        const hours_to_expiry = 3;
        const token = jwt.sign({ id: client.id, isAdmin: false }, process.env.JWT_TOKEN_SECRET, { expiresIn: (hours_to_expiry * 60 * 60) });
        return res.status(200).json({
            type: 'success',
            message: 'User account successfully created.',
            token: token,
            isAdmin: false,
            user: client.display(),
        });
    })
    .catch(error => {
        console.log('error', error);
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not complete registration.'});
    })

}

const confirmPassword = async () => {

}

export {
    login,
    signUp,
    confirmEmail,
    completeRegistration
}
