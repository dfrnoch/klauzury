import { NextFunction, Response } from 'express';
import HttpException from '../exceptions/HttpException';

type SendResponseArgs = {
    data: any;
    res: Response;
    next: NextFunction;
    statusCode?: number;
}

/**
 * @description Send response to client with data and status code
 */
export const response = ({ data, res, next, statusCode }: SendResponseArgs) => {
    if (!data) return next(new HttpException(404, 'Data not found'));
    if (Array.isArray(data) && data.length == 0) return next(new HttpException(404, 'Data not found'));
    res.status(statusCode ? statusCode : 200).json({ success: true, data });
};