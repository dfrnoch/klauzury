
import {Request, Response, NextFunction} from 'express';
import { IUser } from '../models/user/user.interface';


import HttpException from '../exceptions/HttpException';


declare module 'express-serve-static-core' {
    interface Request {
      user: IUser
    } 
  }


export class authCheck {
    public static async check(req: Request, _res: Response, next: NextFunction) {
        if(req.user){
            next();
        } else {
            return next(new HttpException(401, "Unauthorized"))
        }
    }
} 