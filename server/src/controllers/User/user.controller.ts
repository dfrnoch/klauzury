import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { UserService } from './user.service';

export class UserController{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
        this.getUser = this.getUser.bind(this);
    }

    public async getUser(req: Request, res: Response, next: NextFunction){
        const { username } = req.params;
        const user = await this.userService.getOne({ username: username });
        if (!user) return next(new HttpException(404, 'User not found'));

        return res.status(200).json(user);
    }
    
}