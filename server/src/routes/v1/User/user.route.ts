import { Router } from 'express';
import { authCheck } from '../../../middlewares/auth.middleware';
import { UserController } from '../../../controllers/User/user.controller';


const router = Router();
const user = new UserController();

router.use(authCheck.check);

router
    .get('/:id', user.getUser)



export default router; 