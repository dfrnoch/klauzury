import { NextFunction, Request, Response } from 'express';
import { IUser } from 'src/models/user/user.interface';
import HttpException from '../../../exceptions/HttpException';
import { MeService } from './me.service';

export class MeController{
    private meService: MeService;

    constructor(){
        this.meService = new MeService();
        this.updateProfile = this.updateProfile.bind(this);
    }

    public async updateProfile(req: Request, res: Response, next: NextFunction){
        const user = req.body.user as IUser;

        const u = await this.meService.update(user._id, req.body);
        if (!u) return next(new HttpException(400, 'Unexpected error'));

        return res.status(200).json(user);
    }
    
}