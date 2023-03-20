import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../../../database/sequelize/models.js';

dotenv.config();

const isAdminMiddleware = async function (req, res, next) {
    let auth_token = req.headers('authorization');

    if(!auth_token) {
        return res.status(401).json({type: 'error',  message: 'Unauthenticated'});
    }

    let user_data = null;

    try {
        user_data = jwt.verify(auth_token, process.env.JWT_TOKEN_SECRET);

    } catch (err) {
        if(err.name == 'TokenExpiredError') {
            error_message = 'This token has expired. Please make another request.';
        } else {
            console.log('error', err)
            error_message = 'Invalid token';
        }

        return res.status(401).json({type: 'error',  message: error_message});

    }

    if (user_data){
        let user =  await User.findOne({ where: { id: user_data.id } })

        if(user.isAdmin){
            next();
        } else {
            return res.status(401).json({type: 'error',  message: 'Unauthorized'});
        }

    } else {
        return res.status(401).json({type: 'error',  message: 'Unauthorized'});
    }
    

}

export default isAdminMiddleware;
