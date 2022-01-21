import { Router } from 'express';
// import checkJwt from "../../middlewares/checkJwt"

import AuthController from '../../controllers/Auth/auth';

const router = Router();


router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


//[checkJwt.check]
export default router; 