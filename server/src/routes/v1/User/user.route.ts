import { Router } from 'express';
import { checkJwt } from '../../../middlewares/checkJwt.middleware';
import { UserController } from '../../../controllers/User/user.controller';


const router = Router();
const user = new UserController();

router.use(checkJwt.check);

router
    .get('/:id', user.getUser)



export default router; 