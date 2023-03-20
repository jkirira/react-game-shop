import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { formatDuration, formatISO9075 } from 'date-fns';

import { sendPasswordResetEmail } from '../../repositories/mailRepository.js';
import { getJWTToken } from '../../repositories/authRepository.js';
import { User } from '../../../../database/sequelize/models.js';


dotenv.config();


const login = async function (req, res) {
    let data = req.body;
    if( !data['username'] || !data['password'] ) {
        return res.status(400).json({type: 'error', message: "Please fill all values"});
    }

    let user = await User.findOne({ where: { username: data['username'] } });
    if(!user) {
        console.log('', 'User not found', '')
        return res.status(400).json({type: 'error', message: 'Username or password is incorrect!'});
    }

    const password_matches = bcrypt.compareSync(data['password'], user.password);
    if(!password_matches) {
        console.log('', 'Incorrect password', '')
        return res.status(400).json({type: 'error', message: 'Username or password is incorrect!'});
    }

    await user.update({
        last_login: formatISO9075(new Date()),
    });

    let seconds_to_expiry = 3 * 60 * 60;
    let token = getJWTToken({ id: user.id }, seconds_to_expiry);
    return res.status(200).json({
        type: "success", 
        message: "Login Successful!", 
        user: user.display(), 
        token: token, 
    });

}

const forgotPassword = async function (req, res) {
    let data = req.body;
    if( !data['email'] ) {
        return res.status(400).json({type: 'error', message: "Please enter your email!"});
    }


    let user = await User.findOne({ where: { email: data['email'] } });
    if(!user) {
        return res.status(400).json({type: 'error', message: "Could not send password reset email."});
    }

    const minutes_to_expiry = 30;
    const passwordResetToken = getJWTToken({ email: data['email'] }, (minutes_to_expiry * 60));

    const app_url = process.env.VITE_APP_URL;
    const password_reset_link = `${app_url}/admin/reset-password?token=${passwordResetToken}`
    
    const mailData = {
        username: user.username,
        password_reset_link: password_reset_link,
        expiresAfter: formatDuration({ minutes: minutes_to_expiry }),
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

    let user_details = {};

    try {
        user_details = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    } catch(err) {
        let error_message = '';
        if(err.name == 'TokenExpiredError') {
            error_message = 'This token has expired. Please make another request.';
        } else {
            console.log('error', err)
            error_message = 'Invalid token';
        }
        return res.status(400).json({type: 'error',  message: error_message});

    }

    let existingUser = await User.findOne({ where: { email: user_details.email } });

    if(!existingUser) {
        return res.status(400).json({type: 'error', message: "Invalid Token"});
    }

    return res.status(200).json({type: 'success',  message: 'Please reset your password.', email: user_details.email});

}

const passwordReset = async (req, res) => {
    let data = req.body;

    if (!data['email'] || !data['password']) {
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not reset your password.'});
    }

    let user = await User.findOne({ where: { email: data['email'] } });
    if(!user) {
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not reset your password.'});
    }

    const hashed_password = bcrypt.hashSync(data['password'], 10);

    await user.update({
        password: hashed_password,
    })
    .then(response => {
        return res.status(200).json({type: 'success', message: 'Your password has been saved successfully.'});
    })
    .catch(error => {
        console.log('error', error);
        return res.status(400).json({type: 'error',  message: 'Something went wrong. Could not reset your password.'});
    })

}

const authUser = async (req, res) => {
    let data = req.body;
    if( !data['token'] ) {
        return res.status(400).json({type: 'error', message: "Something went wrong. Could not complete your request."});
    }
    
    let token_details = {};

    try {
        token_details = jwt.verify(data['token'], process.env.JWT_TOKEN_SECRET);

    } catch(err) {
        let error_message = '';
        if(err.name == 'TokenExpiredError') {
            error_message = 'The token has expired. Please login to continue.';
        } else {
            console.log('error', err)
            error_message = 'Invalid token';
        }
        return res.status(400).json({type: 'error', message: error_message});

    }

    let user = await User.findOne({ where: { id: token_details.id } });
    if(!user) {
        return res.status(400).json({type: 'error', message: 'Invalid token'});
    }

    
    return res.status(200).json({ user: user.display(), token: data['token'] });

}

export {
    login,
    forgotPassword,
    confirmPasswordReset,
    passwordReset,
    authUser
}
