import { Router } from 'express';
import { authCheck } from "../../../middlewares/auth.middleware"
import { MeController } from "../../../controllers/user/Me/me.controller";

import { meValidator } from '../../../validators/User/me.validator';
import { checkValidator } from '../../../middlewares/checkValidator.middleware';

const router = Router();

const me = new MeController();

router
    .use(authCheck.check);

router
    .get("/")
    .get("/settings", me.getSettings)
    .patch("/profile",
        meValidator.profile, checkValidator,
        me.updateProfile)


export default router; 