import express from 'express';
import { updateProfile } from '../../controllers/admin/profileController.js';

const router = express.Router();

router.post('/:user_id', updateProfile);

export default router;
