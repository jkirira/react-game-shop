import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password_reset_token: DataTypes.STRING,
    password_reset_token_expiry: DataTypes.DATE,

}, 
{
    tableName: 'clients'
});

export default Client;
