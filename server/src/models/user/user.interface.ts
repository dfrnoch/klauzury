import { IUserProfile } from "./profile/profile.interface";
import { Types } from "mongoose";
import { IBaseModel } from "../base.interface";
// import { UserRoles } from "./user.enums";


export interface IUser extends IBaseModel {
    username: string;
	oauthId: string;
	provider: string;
    avatar?: string;

    profile?: IUserProfile | Types.ObjectId | string;
    posts?: Types.ObjectId[];

    checkIat(JWTiat: number): boolean
}
