import { Game, Category } from "../../../../database/sequelize/models.js";

export const getAllGames = async (req, res) => {
    let games = await Game.findAll({ include: Category });
    return res.status(200).json({type: 'success', data: games});
}
