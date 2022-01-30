
import { Types } from "mongoose";
import { IBaseModel } from "../base.interface";
import { IUser } from "../user/user.interface";
// import { UserRoles } from "./user.enums";


export interface IPost extends IBaseModel {
    author: IUser | Types.ObjectId | string;
    title: string;
    content: string;
    privacy: string;
    // category: Types.ObjectId;


}
