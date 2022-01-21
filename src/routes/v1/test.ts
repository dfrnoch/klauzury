import { Router } from 'express';
import checkJwt from "../../middlewares/checkJwt"


const router = Router();


router.post('/jwt', checkJwt.check, (req, res) => {
    const body = req.body;
    res.json({
        message: body
    })
})


export default router; 