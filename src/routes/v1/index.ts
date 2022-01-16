import { Router } from 'express';

import auth from './auth';


const router = Router();

router.post('/auth', auth);


export default router; 