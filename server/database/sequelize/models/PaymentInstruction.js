import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const PaymentInstruction = sequelize.define('PaymentInstruction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reference_number: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    is_successful: DataTypes.BOOLEAN,
    sent: DataTypes.BOOLEAN,
    retries: DataTypes.TINYINT,
    last_sent: DataTypes.DATE,
    failed_reason: DataTypes.TEXT,
}, 
{
    tableName: 'payment_instructions'
});

export default PaymentInstruction;
