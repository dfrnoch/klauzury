
import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';

/**
 * A custom error handler that logs errors to the console.
 * 
 * @param {HttpException} err
 * The error that occurred. 
 * 
 */

class errorHandler {
    public static error(err: HttpException, _req: Request, res: Response, next: NextFunction) {
        if (err) {
            res.status(err.status || 500);
            res.json({
                success: false,
                message: err.message
            });
        }
        next();
    }
}

export default errorHandler;
