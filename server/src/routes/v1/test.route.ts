import { Request, Router, Response } from 'express';
// import { authCheck } from "../../middlewares/auth.middleware"


const router = Router();


router.get('/jwt', async (req: Request, res: Response) => {
    console.log(req.user)




    res.json({ a: "bobux" });
})


export default router; 