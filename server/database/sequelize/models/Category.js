import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
}, 
{
    tableName: 'categories'
});

export default Category;
