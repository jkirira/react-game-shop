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
                    return res.status(500).json({type: 'error', message: "Something went wrong could not create record."});
                });
}

export const getCategory = async (req, res) => {
    let category_id = req.params['category_id'];

    await Category.findOne({ where: { id: category_id } })
                .then(category => {
                    return res.status(200).json({type: 'success', data: {category: category} });
                })
                .catch(error => {
                    return res.status(500).json({type: 'error', message: "Something went wrong could not get category."});
                });
}

export const editCategory = async (req, res) => {
    let category_id = req.params['category_id'];
    let data = req.body;

    await Category.update(data, { where: { id: category_id }})
                .then(category => {
                    return res.status(200).json({type: 'success', message: "Category updated successfully!"});
                })
                .catch(error => {
                    console.log('update error', error);
                    return res.status(500).json({type: 'error', message: "Something went wrong could not update record."});
                });
}

export const deleteCategory = async (req, res) => {
    let category_id = req.params['category_id'];

    await Category.destroy({ where: { id: category_id }})
                .then(response => {
                    return res.status(200).json({type: 'success', message: "Category deleted successfully!"});
                })
                .catch(error => {
                    console.log('delete error', error);
                    return res.status(500).json({type: 'error', message: "Something went wrong could not delete record."});
                });
}
