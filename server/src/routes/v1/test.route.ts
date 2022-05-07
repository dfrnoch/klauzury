import { Request, Router, Response } from 'express';
import { authCheck } from "../../middlewares/auth.middleware"


const router = Router();



router.use(authCheck.check);
router.get('/jwt', async (req: Request, res: Response) => {
    //login user
    const user = req.user;
    console.log(user);





    res.json({ a: "a" });
})


export default router; 