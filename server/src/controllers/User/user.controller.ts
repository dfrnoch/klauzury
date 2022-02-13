import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { UserProfile } from '../../models/user/profile/profile.model';

export class UserController{

    public async getUser(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const user = await UserProfile.findOne({ user: id })
        if (!user) return next(new HttpException(404, 'User not found'));

        return res.status(200).json(user);
    }

}