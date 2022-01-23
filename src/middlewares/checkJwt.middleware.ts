import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

import HttpException from '../exceptions/HttpException';


export class checkJwt {
    public static check(req: Request, _res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (!token) {
            const error = new HttpException(401, 'Unauthorized');
            return next(error);
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if (err) {
                const error = new HttpException(401, 'Unauthorized');
                return next(error);
            
            }
            req.body.user = decoded;
            next();
        });
    }
} 