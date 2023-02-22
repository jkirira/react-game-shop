import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transaction_number: DataTypes.STRING,
    amount: DataTypes.INTEGER,
}, 
{
    tableName: 'payments'
});

export default Payment;
