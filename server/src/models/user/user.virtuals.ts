import { Schema } from "mongoose";
import { Models } from "../models.enums";
import { UserVirtuals } from "./user.enums";
import { IUser } from "./user.interface";

export const setUserVirtuals = (userSchema: Schema<IUser>) => {
    userSchema.virtual(UserVirtuals.PROFILE, {
        ref: Models.USER_PROFILE,
        foreignField: 'user',
        localField: '_id',
        justOne: true
    });
};