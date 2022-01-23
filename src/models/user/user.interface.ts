import { IUserProfile } from "./profile/profile.interface";
import { Types } from "mongoose";
import { IBaseModel } from "../base.interface";
// import { UserRoles } from "./user.enums";


export interface IUser extends IBaseModel {
    username: string;
	email: string;
	password: string;
    // role: UserRoles;

    profile?: IUserProfile | Types.ObjectId | string;


    comparePasswords(decodedPassword: string, hashedPassword: string): Promise<boolean>

}
