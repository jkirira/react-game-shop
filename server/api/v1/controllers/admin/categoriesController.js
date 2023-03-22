import { Category } from "../../../../database/sequelize/models.js";

export const getAllCategories = async (req, res) => {
    let categories = await Category.findAll({ order: [ ['id', 'DESC'] ] });
    return res.status(200).json({type: 'success', data: categories});
}

export const addCategory = async (req, res) => {
    let data = req.body;

    await Category.create(data)
                .then(category => {
                    return res.status(200).json({type: 'success', message: "Category created successfully!"});
                })
                .catch(error => {
                    return res.status(200).json({type: 'error', message: "Something went wrong could not create record."});
                });
}
