
import * as bcrypt from 'bcrypt';

import { IUser } from './user.interface';
import { Models } from '../models.enums';
import mongoose, { Schema } from 'mongoose';
import { setUserVirtuals } from './user.virtuals';


let userSchema = new Schema<IUser>({
    username: {
        type: String,
        trim: true,
        unique: true,
    }, 
    oauthId: {
        type: String,
        unique: true,
        sparse: true,
    },
    provider: {
        type: String,
        enum: ['github', 'discord'],
    },
    iat: {
        type: Date,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});




// methods
userSchema.methods.checkIat = function(JWTiat: number) {
    if (this.iat) {
        const changedTimestamp = parseInt((this.iat.getTime() / 1000).toString(), 10);
        return JWTiat < changedTimestamp;
    }

    return false;
};

setUserVirtuals(userSchema);

export const User = mongoose.model<IUser>(Models.USER, userSchema);