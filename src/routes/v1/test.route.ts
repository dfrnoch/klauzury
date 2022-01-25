import { Request, Router, Response } from 'express';
import { User } from '../../models/user/user.model';
import { checkJwt } from "../../middlewares/checkJwt.middleware"
import { UserVirtuals } from '../../models/user/user.enums';


const router = Router();


router.post('/jwt', [checkJwt.check], async (req: Request, res: Response) => {
    const body = req.body;
    const user = await User.findOne({ _id: body.user.id }).populate(UserVirtuals.PROFILE);

    console.log(user?.toJSON());

    res.json({
        message: body
    })
})


export default router; 