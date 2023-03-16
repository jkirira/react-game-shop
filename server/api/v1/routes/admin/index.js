import express from 'express';
import { login, forgotPassword, confirmPasswordReset, passwordReset, authUser } from '../../controllers/admin/authController.js';

const router = express.Router();

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/confirm-password-reset', confirmPasswordReset);

router.post('/password-reset', passwordReset);

router.post('/auth/user', authUser);

export default router;
