
import {Request, Response, NextFunction} from 'express';


import HttpException from '../exceptions/HttpException';



export class authCheck {
    public static async check(req: Request, _res: Response, next: NextFunction) {
        if(req.user){
            next();
        } else {
            return next(new HttpException(401, "Unauthorized"))
        }
    }
} 