import { Game, Category } from "../../../../database/sequelize/models.js";

export const getAllGames = async (req, res) => {
    let games = await Game.findAll({ include: Category });
    return res.status(200).json({type: 'success', data: games});
}

export const addGame = async (req, res) => {
    let data = req.body;

    await Game.create(data)
                .then(async game => {
                    game.setDataValue('Category', await game.getCategory());
                    return res.status(200).json({type: 'success', message: "Game created successfully!", game: game});
                })
                .catch(error => {
                    return res.status(200).json({type: 'error', message: "Something went wrong could not create record."});
                });
}

export const getGame = async (req, res) => {
    let game_id = req.params['game_id'];

    await Game.findOne({
                where: { id: game_id },
                include: Category,
            })
            .then(game => {
                return res.status(200).json({type: 'success', game: game });
            })
            .catch(error => {
                return res.status(500).json({type: 'error', message: "Something went wrong could not fetch record."});
            });
}

export const editGame = async (req, res) => {
    let game_id = req.params['game_id'];
    let data = req.body;

    await Game.update(data, { where: { id: game_id }})
                .then(game => {
                    return res.status(200).json({type: 'success', message: "Game updated successfully!"});
                })
                .catch(error => {
                    console.log('update error', error);
                    return res.status(500).json({type: 'error', message: "Something went wrong could not update record."});
                });
}

export const deleteGame = async (req, res) => {
    let game_id = req.params['game_id'];

    await Game.destroy({ where: { id: game_id }})
                .then(response => {
                    return res.status(200).json({type: 'success', message: "Game deleted successfully!"});
                })
                .catch(error => {
                    console.log('delete error', error);
                    return res.status(500).json({type: 'error', message: "Something went wrong could not delete record."});
                });
}
