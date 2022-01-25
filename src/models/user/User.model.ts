
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
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});




userSchema.pre<IUser>('save', function (_next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    _next();
 });
 
 userSchema.methods.comparePasswords = (decodedPassword: string, hashedPassword: string) => bcrypt.compare(decodedPassword, hashedPassword);


 
 setUserVirtuals(userSchema);

 export const User = mongoose.model<IUser>(Models.USER, userSchema);