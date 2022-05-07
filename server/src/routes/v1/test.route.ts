import { Request, Router, Response } from 'express';
import { authCheck } from "../../middlewares/auth.middleware"


const router = Router();



router.use(authCheck.check);
router.get('/jwt', async (req: Request, res: Response) => {
    console.log(req.user.avatar);


    res.json({ a: "a" });
})


export default router; 