import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const ClientAccount = sequelize.define('ClientAccount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_name: DataTypes.STRING,
    account_number: DataTypes.STRING,
    is_preferred: DataTypes.BOOLEAN,
}, 
{
    tableName: 'client_accounts'
});

export default ClientAccount;
