import { Router } from 'express';
import errorHandler from '../../middlewares/errorHandler';
// import checkJwt from "../../middlewares/checkJwt"

import AuthController from '../../controllers/Auth/auth';

const router = Router();


router.post('/register', errorHandler.error, AuthController.register);
router.post('/login', errorHandler.error, AuthController.login);


//[checkJwt.check]
export default router; 