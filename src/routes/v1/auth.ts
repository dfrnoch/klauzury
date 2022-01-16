import { Router } from 'express';

import RegisterController from '../../controllers/Auth/register';

const router = Router();


router.post('/register', RegisterController.register);

export default router; 