import express from 'express';
import { getAllCategories, addCategory, editCategory, getCategory, deleteCategory } from '../../controllers/admin/categoriesController.js';

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', addCategory);

router.get('/:category_id', getCategory);

router.put('/:category_id', editCategory);

router.delete('/:category_id', deleteCategory);

export default router;
