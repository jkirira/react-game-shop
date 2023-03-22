import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = function (req, res, next) {
    let auth_token = req.headers['authorization'];

    if(!auth_token) {
        return res.status(401).json({type: 'error',  message: 'Unauthenticated'});
    }

    try {
        jwt.verify(auth_token, process.env.JWT_TOKEN_SECRET);
        next();

    } catch (err) {
        let error_message = '';
        if(err.name == 'TokenExpiredError') {
            error_message = 'This token has expired. Please make another request.';
        } else {
            console.log('error', err)
            error_message = 'Invalid token';
        }

        return res.status(401).json({type: 'error',  message: error_message});

    }
    

}

export default authMiddleware;
