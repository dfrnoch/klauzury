import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { User } from '../models/user/user.model';

import HttpException from '../exceptions/HttpException';


/**
 * Middleware used to check if the jwt is valid user exists in database
 * If it exists, stores it in `req.body.user` to forward it to controllers
 *
 * @throws 400 - Bad request | If the route parameters are missing
 * @throws 401 - Unauthorized | If the jwt is not valid
 * @throws 404 - Not found | If the user doesn't exist
 *
 * @example
 * router.get('/users/:id', checkJwt.check, user.GetUserById);
 */

export class checkJwt {
    public static async check(req: Request, _res: Response, next: NextFunction) {
        let token = req.headers['authorization'] as string;
        if (token.startsWith('Bearer')) token = token.split(' ')[1];
        else if (req.cookies?.token) token = req.cookies.token;

        if (!token) {
            const error = new HttpException(400, 'No token provided');
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
            req.body.user = user;

            next();
        });
    }
} 