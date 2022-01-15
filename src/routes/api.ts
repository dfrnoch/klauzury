import { Router } from 'express';


import RegisterController from '../controllers/Api/v1/Auth/Register';

const router = Router();


router.post('/auth/register', RegisterController.register);

export default router; 