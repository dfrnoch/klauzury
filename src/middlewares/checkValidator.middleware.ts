import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpException from '../exceptions/HttpException';
/**
 * @description short-hand for checking the express-validator results
 * */

export const checkValidator = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) next(new HttpException(400, errors.array()[0].msg));
    next();
};