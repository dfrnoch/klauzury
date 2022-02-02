
import { Types } from "mongoose";
import { IBaseModel } from "../base.interface";
import { IUser } from "../user/user.interface";

export interface IPost extends IBaseModel {
    author: IUser | Types.ObjectId | string;
    title: string;
    content: string;
    privacy: string;
    // category: Types.ObjectId;
    

}
