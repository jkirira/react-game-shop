import express from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import isAdminMiddleware from '../../middleware/isAdminMiddleware.js';
import { login, forgotPassword, confirmPasswordReset, passwordReset, authUser } from '../../controllers/admin/authController.js';

const router = express.Router();

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/confirm-password-reset', confirmPasswordReset);

router.post('/password-reset', passwordReset);

router.post('/auth/user', authMiddleware, isAdminMiddleware, authUser);

export default router;
