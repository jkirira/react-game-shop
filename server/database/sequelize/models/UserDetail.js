import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const UserDetail = sequelize.define('UserDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    physical_address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
}, 
{
    tableName: 'user_details'
});

export default UserDetail;
