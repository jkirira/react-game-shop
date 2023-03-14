import express from 'express';
import { login, forgotPassword, confirmPasswordReset, passwordReset } from '../../controllers/admin/authController.js';

const router = express.Router();

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/confirm-password-reset', confirmPasswordReset);

router.post('/password-reset', passwordReset);

export default router;
