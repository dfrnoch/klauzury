import { IUser } from '../user.interface';
import { Types } from 'mongoose';
import { IBaseModel } from '../../base.interface';

export interface IUserProfile extends IBaseModel {
    user: IUser | Types.ObjectId | string;
    bio: string;
    gender: 'M' | 'F' | 'UNKNOWN';
}