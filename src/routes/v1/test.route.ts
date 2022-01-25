import { Request, Router, Response } from 'express';
import { checkJwt } from "../../middlewares/checkJwt.middleware"


const router = Router();


router.post('/jwt', [checkJwt.check], async (req: Request, res: Response) => {
    const user = req.body.user

    res.json({ user });
})


export default router; 