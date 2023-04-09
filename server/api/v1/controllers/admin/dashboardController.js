import { Category, Game, User, Client, Payment } from "../../../../database/sequelize/models.js";

export const dashboardInfo = async (req, res) => {
    let data = {
        categories_count: await Category.count(),
        games_count: await Game.count(),
        users_count: await User.count(),
        clients_count: await Client.count(),
        payments_count: await Payment.count(),
    }
    return res.status(200).json({type: 'success', data: data});
}
