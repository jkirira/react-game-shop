import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db_name = process.env.DB_NAME
const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_connection = process.env.DB_CONNECTION
const db_host = process.env.DB_HOST

const sequelize = new Sequelize(
    db_name, 
    db_username, 
    db_password, 
    {
        dialect: db_connection,
        host: db_host,
        define: {
            underscored: true,
            timestamps: true,
            paranoid: true,
            freezeTableName: false,
            // charset: 'utf8',
        },
        // dialectOptions: {
        //     collate: 'utf8_general_ci'
        // },
    }
);

export default sequelize;
