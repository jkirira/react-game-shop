import jwt from "jsonwebtoken";
import { User } from "../../../../database/sequelize/models.js";

export const updateProfile = async (req, res) => {
    let user_id = req.params['user_id'];
    let auth_token = req.headers['authorization'];
    let data = req.body;

    let token_data = null;

    try {
        token_data = jwt.verify(auth_token, process.env.JWT_TOKEN_SECRET);

    } catch (err) {
        let error_message = null;
        if(err.name == 'TokenExpiredError') {
            error_message = 'This token has expired. Please login again.';
        } else {
            console.log('error', err)
            error_message = 'Invalid token';
        }

        return res.status(401).json({type: 'error',  message: error_message});

    }

    if(token_data.id != user_id) {
        return res.status(401).json({type: 'error',  message: 'You are not allowed to perform this action.'});
    }

    await User.update(data, { where: { id: user_id }})
                .then(user => {
                    return res.status(200).json({type: 'success', message: "Profile updated successfully!"});
                })
                .catch(error => {
                    console.log('update error', error);
                    return res.status(500).json({type: 'error', message: "Something went wrong could not update record."});
                });
}
