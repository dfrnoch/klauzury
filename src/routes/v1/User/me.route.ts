import { Router } from 'express';
import { checkJwt } from "../../../middlewares/checkJwt.middleware"


const router = Router();


router
    .use(checkJwt.check);

router
    .post('/jwt')


export default router; 