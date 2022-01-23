import jwt from 'jsonwebtoken';


import { Request, Response, NextFunction } from 'express';
import User from "../../models/user/User.model";
import HttpException from '../../exceptions/HttpException';
import { AuthService } from './auth.service';
import {IUser} from '../../models/user/user.interface';

interface UserForm {
    email: string;
    password: string;
}





class AuthController {

    constructor(public authService: AuthService) {
        this.authService = authService;
    }

    async login(req: Request, res: Response, next: NextFunction) {

        const { username, email, password } = req.body;

        if (!username && !email) return next(new HttpException(201, 'fields \'username\' or \'email\' must be specified'));

        const conditions: Partial<{ username?: string; email?: string; }> = {};

        if (email) conditions.email = email;
        else conditions.username = username;

        const user = await this.authService.get(conditions);

        if (!user || !(await user.comparePasswords(password, user.password)))
            return next(new HttpException(400, 'incorrect credentials'));

        this.createJwt(user, res);
    }

    
    async register(req: Request, res: Response, next: NextFunction) {
        const user = await this.authService.create(req.body);


        this.createJwt(user, res);

    }

    private createJwt(user: IUser, res: Response) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string);

        return res.status(200).json({
            success: true,
            token: token
        });
    }
    
}

export default AuthController;