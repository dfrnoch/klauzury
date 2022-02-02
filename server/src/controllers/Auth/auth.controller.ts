import jwt from 'jsonwebtoken';


import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';
import { IUser } from '../../models/user/user.interface';
import { UserProfile } from '../../models/user/profile/profile.model';
import { User } from '../../models/user/user.model';
import { response } from '../../utils/response';




export class AuthController {


    async login(req: Request, res: Response, next: NextFunction) {
        const { username, email, password } = req.body;

        if (!username && !email) return next(new HttpException(400, 'Username or email must be specified'));

        const conditions: Partial<{ username?: string; email?: string; }> = {};

        if (email) conditions.email = email;
        else conditions.username = username;

        const user = await User.findOne(conditions);

        if (!user || !(await user.comparePasswords(password, user.password)))
            return next(new HttpException(400, 'Incorrect credentials'));


        return this.createJwt(user, res, next);
    }


    async register(req: Request, res: Response, next: NextFunction) {
        const { username, email } = req.body;

        if (!username && !email) return next(new HttpException(400, 'Username or email must be specified'));

        const checkEmail = await User.findOne({ email });
        const checkUsername = await User.findOne({ username });
        if (checkEmail || checkUsername) return next(new HttpException(400, 'User with this email or username already exists'));


        const user = await User.create(req.body);
        await UserProfile.create({ user: user._id });

        return this.createJwt(user, res, next);
    }


    async updatePassword(req: Request, res: Response, next: NextFunction) {
        const { password, newpassword } = req.body;

        const user = req.body.user as IUser;

        if (!user || !(await user.comparePasswords(password, user.password)))
            return next(new HttpException(400, 'Incorrect Details'));
        if (password === newpassword)
            return next(new HttpException(400, 'New password must be different from old password'));

        const hashedPassword = await user.hashPassword(newpassword);

        await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

        return this.createJwt(user, res, next);
    }




    private createJwt(user: IUser, res: Response, next: NextFunction) {
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET as string, { expiresIn: '365d' });

        return response({ data: { token }, res, next, statusCode: 200 });
    }

}
