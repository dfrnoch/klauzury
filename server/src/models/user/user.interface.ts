import { IUserProfile } from "./profile/profile.interface";
import { Types } from "mongoose";
import { IBaseModel } from "../base.interface";
// import { UserRoles } from "./user.enums";


export interface IUser extends IBaseModel {
    username: string;
	email: string;
	password: string;
    iat: Date;

    profile?: IUserProfile | Types.ObjectId | string;
    posts?: Types.ObjectId[];



    comparePasswords(decodedPassword: string, hashedPassword: string): Promise<boolean>
    checkIat(JWTiat: number): boolean
    hashPassword(password: string): Promise<string>
}
