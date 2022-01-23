import { Router } from 'express';

import auth from './auth.route';
import test from './test.route';


const router = Router();

router.use('/auth', auth);
router.use('/test', test);

export default router; 