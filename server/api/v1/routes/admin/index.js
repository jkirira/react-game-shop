import express from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import isAdminMiddleware from '../../middleware/isAdminMiddleware.js';
import categoriesRouter from './categories.js';
import gamesRouter from './games.js';
import { login, forgotPassword, confirmPasswordReset, passwordReset, authUser } from '../../controllers/admin/authController.js';
import { dashboardInfo } from '../../controllers/admin/dashboardController.js';

const router = express.Router();

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/confirm-password-reset', confirmPasswordReset);

router.post('/password-reset', passwordReset);

router.post('/auth/user', authMiddleware, isAdminMiddleware, authUser);

router.use('/dashboard', authMiddleware, isAdminMiddleware, dashboardInfo);

router.use('/games', authMiddleware, isAdminMiddleware, gamesRouter);

router.use('/categories', authMiddleware, isAdminMiddleware, categoriesRouter);

export default router;
