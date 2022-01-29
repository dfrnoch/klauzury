
import { Types } from "mongoose";
import { IBaseModel } from "../base.interface";
import { IUser } from "../user/user.interface";
// import { UserRoles } from "./user.enums";


export interface IPost extends IBaseModel {
    author: Types.ObjectId | IUser;
    title: string;
    content: string;
    privacy: string;
    likes: number;
    category: Types.ObjectId;


}
