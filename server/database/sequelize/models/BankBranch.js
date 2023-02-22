import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const BankBranch = sequelize.define('BankBranch', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
}, 
{
    tableName: 'bank_branches'
});

export default BankBranch;
