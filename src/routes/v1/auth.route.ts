import { Router } from 'express';

import { authValidator } from '../../validators/auth.validator';
import { checkValidator } from '../../middlewares/checkValidator.middleware';

import { AuthController } from '../../controllers/Auth/auth.controller';
import { checkJwt } from '../../middlewares/checkJwt.middleware';

const router = Router();
const auth = new AuthController();

router.post('/register',
    authValidator.register, checkValidator,
    auth.register
)

    .post('/login',
        authValidator.login, checkValidator,
        auth.login
    )
    
    .post('/updatepassword',
        [checkJwt.check],
        authValidator.updatePassword, checkValidator,
        auth.updatePassword
    );


export default router; 