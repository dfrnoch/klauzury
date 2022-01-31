
import { Types } from "mongoose";
import { IBaseModel } from "../../base.interface";
import { IUser } from "../../user/user.interface";


export interface IComment extends IBaseModel {
    author: IUser | Types.ObjectId | string;
    content: string;
    likes: IUser[] | Types.ObjectId[];
}
