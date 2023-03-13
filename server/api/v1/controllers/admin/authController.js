import bcrypt from 'bcrypt';
import { formatISO9075 } from 'date-fns';

import { getJWTToken } from '../../repositories/authRepository.js';
import { User } from '../../../../database/sequelize/models.js';


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
    let token = getJWTToken({ id: user.id, isAdmin: true }, seconds_to_expiry);
    return res.status(200).json({
        type: "success", 
        message: "Login Successful!", 
        user: user.display(), 
        token: token, 
        isAdmin: true
    });

}


export {
    login,
}
