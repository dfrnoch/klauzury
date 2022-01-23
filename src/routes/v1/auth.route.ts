import { Router } from 'express';

import { authValidator } from '../../validators/auth.validator';
import { checkValidator } from '../../middlewares/checkValidator.middleware';

import { AuthController } from '../../controllers/Auth/auth.controller';

const router = Router();
const auth = new AuthController();

router.post('/register',
    authValidator.register, checkValidator,
    auth.register
);

router.post('/login',
    authValidator.login,
    auth.login
);



export default router; 