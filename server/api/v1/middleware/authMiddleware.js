import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = function (req, res, next) {
    let auth_token = req.headers['authorization'];

    if(!auth_token) {
        return res.status(401).json({type: 'error',  message: 'Unauthenticated'});
    }

    try {
        let token_data = jwt.verify(auth_token, process.env.JWT_TOKEN_SECRET);

        if (token_data.id && token_data.username) {
            next();
        } else {
            throw new Error('Invalid token');
        }

    } catch (err) {
        let error_message = '';
        if(err.name == 'TokenExpiredError') {
            error_message = 'This token has expired. Please login  to continue.';
        } else {
            console.log('error', err)
            error_message = 'Invalid token';
        }

        return res.status(401).json({type: 'error',  message: error_message});

    }
    

}

export default authMiddleware;
