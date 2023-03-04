import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { add, formatISO9075, formatDuration, isAfter } from 'date-fns';

import sequelize from '../config/database.js';
import { sendEmailConfirmation } from '../controllers/mailController.js';
import { Client, ClientDetail } from '../database/sequelize/models.js';


dotenv.config();


const login = function (req, res) {
    if( !!req.body.username || !!req.body.password ) {
        return res.status(400).json({type: 'error', message: "Please fill all values"});
    }
}

const signUp = async function (req, res) {
    let data = req.body;

    if( !data['email'] || !data['username'] || !data['password'] ) {
        return res.status(400).json({type: 'error', message: "Please fill all values"});
    }


    let existingUser = await Client.findOne({ 
                                where: { username: data['username'] },
                                include: ClientDetail
                            });

    if(!!existingUser && existingUser.registration_complete == 1) {
        return res.status(400).json({type: 'error', message: "That username is already taken!"});
    }


    let hashed_password = bcrypt.hashSync(data['password'], 10);
    let confirmationToken = bcrypt.hashSync(Date.now().toString(), 10);
    
    let existingUserWithConfirmationToken = await Client.findOne({ where: { email_confirmation_token: confirmationToken } });
    while(!!existingUserWithConfirmationToken) {
        confirmationToken = bcrypt.hashSync((Date.now() + Math.random()).toString(), 10);
        existingUserWithConfirmationToken = await Client.findOne({ where: { email_confirmation_token: confirmationToken } });
    }
    
    
    let client = {};
    let clientDetail = {};
    const expiresAfter = { hours: 5 };
    
    if(
        !!existingUser 
        && existingUser.registration_complete !== 1 
        && existingUser.ClientDetail.email == data['email']
    ){
        
        await existingUser.update({
            password: hashed_password,
            email_confirmation_token: confirmationToken,
            email_confirmation_token_expiry: formatISO9075(add(new Date(), expiresAfter)),
        })

        client = existingUser;
        clientDetail = existingUser.ClientDetail;

    } else {
                        
        const t = await sequelize.transaction();

        try {
            client = await Client.create({
                username: data['username'],
                password: hashed_password,
                email_confirmation_token: confirmationToken,
                email_confirmation_token_expiry: formatISO9075(add(new Date(), expiresAfter)),
            }, { transaction: t });

            clientDetail = await ClientDetail.create({
                email: data['email'],
                client_id: client.id
            }, { transaction: t });

            await t.commit();

        } catch(error) {
            console.log(error);
            console.log();
            await t.rollback();
            return res.status(400).json({type: 'error', message: "Something went wrong. Could not create user record."});
        }

    }


    const app_url = process.env.VITE_APP_URL;
    const email_confirmation_link = `${app_url}/confirm-email?token=${confirmationToken}`
    
    const mailOptions = {
        username: client.username,
        email_confirmation_link: email_confirmation_link,
        expiresAfter: formatDuration(expiresAfter),
    }

    await sendEmailConfirmation(clientDetail.email, mailOptions)
            .then(response => {
                client.update({email_confirmation_sent: 1});
            })
            .then(() => {
                return res.status(200).json({type: 'success', message: "User record successfully created! An email confirmation email has been sent. Please confirm your password to continue."});
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

    let client = await Client.findOne({ where: { email_confirmation_token: token, registration_complete: null } });

    console.log('client', client);
    if(!client) {
       return res.status(400).json({type: 'error',  message: 'Invalid token.'});
    }

    if(isAfter(new Date(), new Date(client.email_confirmation_token_expiry))) {
        return res.status(400).json({type: 'error',  message: 'The confirmation token has expired. Please sign up again'});
    }

    await client.update({ registration_complete: 1 })
                .then(() => {
                    return res.status(200).json({type: 'success',  message: 'Your email has been confirmed.'});
                })
                .catch(() => {
                    return res.status(400).json({type: 'error',  message: 'An error occurred. Could not complete this request.'});
                });

}

const confirmPassword = async () => {

}

export {
    login,
    signUp,
    confirmEmail
}
