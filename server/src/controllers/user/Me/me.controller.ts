import { NextFunction, Request, Response } from 'express';
// import { IUser } from 'src/models/user/user.interface';
import HttpException from '../../../exceptions/HttpException';
import { UserProfile } from '../../../models/user/profile/profile.model';
import { User } from '../../../models/user/user.model';
import { response } from '../../../utils/response';

export class MeController {

    public async updateProfile(req: Request, res: Response, next: NextFunction) {
        const { bio, color, website, location } = req.body;

        const profile = await UserProfile.findOneAndUpdate({ user: req.body.user._id }, {
            bio,
            color,
            website,
            location
        }, { new: true });

        if (!profile) return next(new HttpException(404, 'User not found'));

        return response({ data: profile, res, next, statusCode: 200 });
    }

    public async getSettings(req: Request, res: Response, next: NextFunction) {

        const user = await User.findById(req.body.user._id).select('+email');
        if (!user) return next(new HttpException(404, 'User not found'));

        return response({ data: user, res, next, statusCode: 200 });

    }
}