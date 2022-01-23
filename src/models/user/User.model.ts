
 import * as bcrypt from 'bcrypt';
 
 import { IUser } from './user.interface';
 import { Models } from '../models.enum';
 import mongoose, { Schema } from 'mongoose';
 import { setUserVirtuals } from './user.virtuals';
 

 let userSchema = new Schema<IUser>({
    username: {
        type: String,
        minlength: [2, 'field \'username\' must contains at least 2 characters'],
        maxlength: [32, 'field \'username\' must contain no more than 32 characters'],
        trim: true,
        unique: true,
        required: [true, 'field \'username\' is required'],
    },
    email: {
        type: String,
        select: false,
        trim: true,
        unique: true,
        required: [true, 'field \'email\' is required'],
    },
    password: {
        type: String,
        required: [true, 'field \'password\' is required'],
        select: false
    },
    // role: {
    //     type: SchemaTypes.String,
    //     enum: ['user', 'admin'],
    //     default: 'user'
    // },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


userSchema.pre<IUser>('save', function (_next: any) {
     if (!this.isModified('password')) {
         return _next();
     }
 
     bcrypt.genSalt(10, (_err: any, _salt: string) => {
         if (_err) {
             return _next(_err);
         }
 
         bcrypt.hash(this.password, _salt, (_err: any, _hash: string) => {
             if (_err) {
                 return _next(_err);
             }
 
             this.password = _hash;
             return _next();
         });
     });
 });
 
 userSchema.methods.comparePasswords = (decodedPassword: string, hashedPassword: string) => bcrypt.compare(decodedPassword, hashedPassword);


 
 setUserVirtuals(userSchema);

 export const User = mongoose.model<IUser>(Models.USER, userSchema);;