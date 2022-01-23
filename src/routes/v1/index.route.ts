import { Router } from 'express';

import auth from './auth';
import test from './test';


const router = Router();

router.use('/auth', auth);
router.use('/test', test);

export default router; 