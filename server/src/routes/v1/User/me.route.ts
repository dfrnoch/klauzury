import { Router } from 'express';
import { checkJwt } from "../../../middlewares/checkJwt.middleware"
import { MeController } from "../../../controllers/User/Me/me.controller";

import { meValidator } from '../../../validators/User/me.validator';
import { checkValidator } from '../../../middlewares/checkValidator.middleware';

const router = Router();

const me = new MeController();

router
    .use(checkJwt.check);

router
    .get("/")
    .get("/settings", me.getSettings);
    .patch("/profile",
        meValidator.profile, checkValidator,
        me.updateProfile)


export default router; 