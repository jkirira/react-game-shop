import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function getJWTToken(data, seconds_to_expiry) {
    if (!seconds_to_expiry && seconds_to_expiry != 0) {
        seconds_to_expiry = 3 * 60 * 60; // 3 hours
    }

    const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET, { expiresIn: seconds_to_expiry });
    return token;
}
