import { Request, Router, Response } from 'express';
import { authCheck } from "../../middlewares/auth.middleware"


const router = Router();


router.post('/jwt', [authCheck.check], async (req: Request, res: Response) => {
    const user = req.body.user

    res.json({ user });
})


export default router; 