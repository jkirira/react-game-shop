import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    password_reset_token: DataTypes.STRING,
    password_reset_token_expiry: DataTypes.DATE,
    password_reset_sent: DataTypes.TINYINT,
    email_confirmation_token: DataTypes.STRING,
    email_confirmation_token_expiry: DataTypes.DATE,
    email_confirmation_sent: DataTypes.TINYINT,
    registration_complete: DataTypes.TINYINT,
}, 
{
    tableName: 'users'
});

export default User;
