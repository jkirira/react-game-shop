import ejs from 'ejs';
import { support, mailer } from '../../../config/mail.js';


const sendEmail = (data) => {
    
}


const sendEmailConfirmation = async (to, mailOptions) => {
    if(!to) {
        console.log('Missing to email address');
        return;
    }

    let html = '';

    ejs.renderFile('server/templates/emails/confirm_email.ejs', mailOptions, {}, function(err, str){
        // str => Rendered HTML string
        if(err){
            console.log('ejs error', err)
        } else {
            html = str;
        }
    });

                
    const options = {
        to: to,
        from: support,
        subject: 'Confirm your Game Shop Email',
        html: html
    }

   await mailer.sendMail(options);

}


const sendPasswordResetEmail = async (to, mailData) => {
    if(!to) {
        console.log('Missing to email address');
        return;
    }

    let html = '';

    ejs.renderFile('server/templates/emails/password_reset.ejs', mailData, {}, function(err, str){
        // str => Rendered HTML string
        if(err){
            console.log('ejs error', err)
        } else {
            html = str;
        }
    });

                
    const options = {
        to: to,
        from: support,
        subject: 'Reset your Game Shop password',
        html: html
    }

   await mailer.sendMail(options);

}


export {
    sendEmailConfirmation,
    sendPasswordResetEmail,
}
