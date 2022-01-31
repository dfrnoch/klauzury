import { NextFunction, Request, Response } from 'express';
import { IUser } from 'src/models/user/user.interface';
import HttpException from '../../../exceptions/HttpException';
import { User } from '../../../models/user/user.model';

export class MeController{
    private model;

    constructor(){
        this.model = User;
    }

    public async updateProfile(req: Request, res: Response, next: NextFunction){
        const user = req.body.user as IUser;

        const u = await this.model.findByIdAndUpdate(user._id, {
            username: user.username,
            email: user.email
        }, { new: true });

        if (!u) return next(new HttpException(400, 'Unexpected error'));

        return res.status(200).json(user);
    }
    
}