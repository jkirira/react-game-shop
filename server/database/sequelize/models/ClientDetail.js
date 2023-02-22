import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const ClientDetail = sequelize.define('ClientDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    physical_address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
}, 
{
    tableName: 'client_details'
});

export default ClientDetail;
