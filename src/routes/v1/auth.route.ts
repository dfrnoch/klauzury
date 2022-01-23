import { Router } from 'express';

import { authValidator } from '../../validators/auth.validator';
import { checkValidator } from '../../middlewares/checkValidator.middleware';

import { AuthService } from '../../controllers/Auth/auth.service';
import { AuthController } from '../../controllers/Auth/auth.controller';

const router = Router();
const auth = new AuthController(new AuthService());


router.post('/register',
    authValidator.register, checkValidator,
    auth.register
);

router.post('/login',
    authValidator.login, checkValidator,
    auth.login
);



export default router; 