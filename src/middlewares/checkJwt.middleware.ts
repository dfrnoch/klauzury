import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { User } from '../models/user/user.model';

import HttpException from '../exceptions/HttpException';


export class checkJwt {
    public static async check(req: Request, _res: Response, next: NextFunction) {
        let token = req.headers['authorization'] as string;
        if (token.startsWith('Bearer')) token = token.split(' ')[1];
        else if (req.cookies?.token) token = req.cookies.token;

        if (!token) {
            const error = new HttpException(401, 'No token provided');
            return next(error);
        }

        jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, result: any) => {
            if (err) {
                const error = new HttpException(401, err.message);
                return next(error);
            }

            const user = await User.findOne({_id: result.id}).select('+password +email');
            if (!user) {
                const error = new HttpException(401, 'Invalid token');
                return next(error);
            }

            if (user.checkIat(result.iat)) {
                const error = new HttpException(401, 'Token expired');
                return next(error);
            }
            console.log(user.checkIat(result.iat))

            console.log("res" + result.iat)
            req.body.user = user;

            next();
        });
    }
} 