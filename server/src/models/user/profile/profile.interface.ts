import { IUser } from '../user.interface';
import { Types } from 'mongoose';
import { IBaseModel } from '../../base.interface';

export interface IUserProfile extends IBaseModel {
    user: IUser | Types.ObjectId | string;
    status: string;
    bio: string
    color: string
    website: string;
    location: string;
    avatar: string;
    interests: string[];

}