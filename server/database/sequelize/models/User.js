import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const HIDDEN_ATTRIBUTES = [
    'password',
    'createdAt',
    'updatedAt',
    'deletedAt',
];

const User = sequelize.define('User', {
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
    isAdmin: {
        type: DataTypes.VIRTUAL,
        get() {
            return true;
          },
          set(value) {
            throw new Error('Cannot set virtual field.');
          }
    },
}, 
{
    tableName: 'users'
});

User.prototype.display = function() {
    let user = Object.assign({}, this.toJSON());
    for (let attr of HIDDEN_ATTRIBUTES) {
      delete user[attr];
    }
    return user;
    
}

export default User;
