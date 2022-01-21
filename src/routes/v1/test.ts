import { Request, Router, Response } from 'express';
import checkJwt from "../../middlewares/checkJwt"
import errorHandler from '../../middlewares/errorHandler';


const router = Router();


router.post('/jwt', [checkJwt.check, errorHandler.error], (req: Request, res: Response) => {
    const body = req.body;
    res.json({
        message: body
    })
})


export default router; 