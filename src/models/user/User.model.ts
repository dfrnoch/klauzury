
import * as bcrypt from 'bcrypt';

import { IUser } from './user.interface';
import { Models } from '../models.enum';
import mongoose, { Schema } from 'mongoose';
import { setUserVirtuals } from './user.virtuals';


let userSchema = new Schema<IUser>({
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        select: false,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        select: false
    },
    iat: {
        type: Date,
        select: false
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


userSchema.pre<IUser>("save", function (next) 
{ 
     if(this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        next();
     }
     next();
});


userSchema.methods.checkIat = function(JWTiat: number) {
    if (this.iat) {
        const changedTimestamp = parseInt((this.iat.getTime() / 1000).toString(), 10);
        return +JWTiat < changedTimestamp;
    }

    return false;
};

userSchema.methods.comparePasswords = (decodedPassword: string, hashedPassword: string) => bcrypt.compare(decodedPassword, hashedPassword);

userSchema.methods.hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);


setUserVirtuals(userSchema);

export const User = mongoose.model<IUser>(Models.USER, userSchema);