import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const Bank = sequelize.define('Bank', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
}, 
{
    tableName: 'banks'
});

export default Bank;
