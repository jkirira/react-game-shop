import express from 'express';

import AdminRouter from './admin/index.js';
import ClientRouter from './client/index.js';


const router = express.Router();

router.use('/admin', AdminRouter);

router.use('/', ClientRouter);

export default router;
