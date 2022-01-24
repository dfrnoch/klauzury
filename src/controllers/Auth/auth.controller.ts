import jwt from 'jsonwebtoken';


import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';
import {IUser} from '../../models/user/user.interface';
import { AuthService } from './auth.service';




export class AuthController {
    authService = new AuthService();

    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    


    async login(req: Request, res: Response, next: NextFunction) {

        const { username, email, password } = req.body;

        if (!username && !email) return next(new HttpException(400, 'Username or email must be specified'));

        const conditions: Partial<{ username?: string; email?: string; }> = {};
 
        if (email) conditions.email = email;
        else conditions.username = username;

        const user = await this.authService.get(conditions);

        if (!user || !(await user.comparePasswords(password, user.password)))
            return next(new HttpException(400, 'Incorrect credentials'));
 
        this.createJwt(user, res);
    }

    
    async register(req: Request, res: Response, next: NextFunction) {
        const { username, email } = req.body;

        if (!username && !email) return next(new HttpException(400, 'Username or email must be specified'));

        const checkEmail = await this.authService.get({"email": email});
        const checkUsername = await this.authService.get({"username": username});
        if (checkEmail || checkUsername) return next(new HttpException(400, 'User with this email or username already exists'));


        const user = await this.authService.create(req.body);
        this.createJwt(user, res);
    }



    private createJwt(user: IUser, res: Response) {
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET as string, { expiresIn: '90d' });


        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 90,
            secure: false,
            sameSite: true,
        });

        return res.status(200).json({ 
            success: true,
            token 
        });
    }
    
}
