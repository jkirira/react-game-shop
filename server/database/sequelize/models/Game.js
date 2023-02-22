import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    release_date: DataTypes.DATE,
    trailer_link: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    developed_by: DataTypes.STRING,
    poster: DataTypes.STRING,
}, 
{
    tableName: 'games'
});

export default Game;
