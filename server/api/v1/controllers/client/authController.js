import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { formatDuration, formatISO9075 } from 'date-fns';

import { sendEmailConfirmation, sendPasswordResetEmail } from '../../repositories/mailRepository.js';
import { getJWTToken } from '../../repositories/authRepository.js';
import { Client } from '../../../../database/sequelize/models.js';


dotenv.config();


const login = async function (req, res) {
    let data = req.body;
    if( !data['username'] || !data['password'] ) {
        return res.status(400).json({type: 'error', message: "Please fill all values"});
    }

    let client = await Client.findOne({ where: { username: data['username'] } });
    if(!client) {
        console.log('', 'User not found', '')
        return res.status(400).json({type: 'error', message: 'Username or password is incorrect!'});
    }

    const password_matches = bcrypt.compareSync(data['password'], client.password);
    if(!password_matches) {
        console.log('', 'Incorrect password', '')
        return res.status(400).json({type: 'error', message: 'Username or password is incorrect!'});
    }

    await client.update({
        last_login: formatISO9075(new Date()),
    });

    let seconds_to_expiry = 3 * 60 * 60;
    let token = getJWTToken({ id: client.id, isAdmin: false }, seconds_to_expiry);
    return res.status(200).json({
        type: "success", 
        message: "Login Successful!", 
        user: client.display(), 
        token: token, 
        isAdmin: false
    });

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
    const confirmationToken = jwt.sign({ email: data['email'], time: Date.now() }, process.env.JWT_TOKEN_SECRET, { expiresIn: (hours_to_expiry * 60 * 60) });

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

const forgotPassword = async function (req, res) {
    let data = req.body;
    if( !data['email'] ) {
        return res.status(400).json({type: 'error', message: "Please enter your email!"});
    }


    let client = await Client.findOne({ where: { email: data['email'] } });
    if(!client) {
        return res.status(400).json({type: 'error', message: "Email does not exist!"});
    }

    const hours_to_expiry = 0.5;
    const passwordResetToken = getJWTToken({ email: data['email'], time: Date.now() }, (hours_to_expiry * 60 * 60));

    const app_url = process.env.VITE_APP_URL;
    const password_reset_link = `${app_url}/reset-password?token=${passwordResetToken}`
    
    const mailData = {
        username: client.username,
        password_reset_link: password_reset_link,
        expiresAfter: formatDuration({ hours: hours_to_expiry }),
    }

    await sendPasswordResetEmail(data['email'], mailData)
            .then(response => {
                return res.status(200).json({type: 'success', message: "A password reset email has been sent. Please check your email to reset your password."});
            })
            .catch(error => {
                return res.status(400).json({type: 'error', message: "Could not send password reset email."});
            });

}

const confirmPasswordReset = async (req, res) => {
    const token = req.body['token'];

    if (!token) {
       return res.status(400).json({type: 'error',  message: 'A reset token must be provided.'});
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

    if(!existingUser) {
        return res.status(400).json({type: 'error', message: "Invalid Token"});
    }

    return res.status(200).json({type: 'success',  message: 'Please reset your password.', email: client_details.email});

}

const passwordReset = async (req, res) => {
    let data = req.body;

    if (!data['email'] || !data['password']) {
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not reset your password.'});
    }

    let client = await Client.findOne({ where: { email: data['email'] } });
    if(!client) {
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not reset your password.'});
    }

    const hashed_password = bcrypt.hashSync(data['password'], 10);

    await client.update({
        password: hashed_password,
    })
    .then(response => {
        return res.status(200).json({type: 'success', message: 'Your password has been saved successfully.'});
    })
    .catch(error => {
        console.log('error', error);
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not complete registration.'});
    })

}


export {
    login,
    signUp,
    confirmEmail,
    completeRegistration,
    forgotPassword,
    confirmPasswordReset,
    passwordReset,
}
