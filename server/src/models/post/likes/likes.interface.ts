
import { Types } from "mongoose";
import { IUser } from "../../user/user.interface";


export interface ILikes {
    post: Types.ObjectId;
    users: IUser[] | Types.ObjectId[] | string[];
}
