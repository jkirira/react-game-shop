import express from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import { completeRegistration, confirmEmail, login, signUp, forgotPassword, confirmPasswordReset, passwordReset, authUser } from '../../controllers/client/authController.js';

const router = express.Router()

router.post('/login', login)

router.post('/sign-up', signUp)

router.post('/confirm-email', confirmEmail)

router.post('/complete-registration', completeRegistration)

router.post('/forgot-password', forgotPassword)

router.post('/confirm-password-reset', confirmPasswordReset)

router.post('/password-reset', passwordReset)

router.post('/auth/user', authMiddleware, authUser);

export default router;
