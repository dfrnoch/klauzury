import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { User } from '../../models/user/user.model';

export class MeController{
    private model;

    constructor(){
        this.model = User;
    }


    public async getUser(req: Request, res: Response, next: NextFunction){
        const { username } = req.params;
        const user = await this.model.findOne({ username });
        if (!user) return next(new HttpException(404, 'User not found'));

        return res.status(200).json(user);
    }
    
}