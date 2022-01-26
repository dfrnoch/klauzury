import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpException from '../exceptions/HttpException';

/**
 * Middleware used to check errors of the validation result
 *
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 *
 * @throws 400 - Bad request | If parameters are not valid
 *
 * @example
 * router.post('/login', authValidator.login, checkValidator, auth.login)
 */
export const checkValidator = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) next(new HttpException(400, errors.array()[0].msg));
    next();
};