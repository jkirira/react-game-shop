import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const HIDDEN_ATTRIBUTES = [
    'password',
    'createdAt',
    'updatedAt',
    'deletedAt',
];

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    physical_address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    last_login: DataTypes.DATE,
}, 
{
    tableName: 'clients'
});

Client.prototype.display = function() {
    let client = Object.assign({}, this.toJSON());
    for (let attr of HIDDEN_ATTRIBUTES) {
      delete client[attr];
    }
    return client;
    
}

export default Client;
