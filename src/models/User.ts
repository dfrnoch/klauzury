/**
 * Define User model
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

 import * as bcrypt from 'bcrypt';
 
 import { IUser } from '../interfaces/user';
 import mongoose from 'mongoose';
 
 export interface IUserModel extends IUser, mongoose.Document {
    isModified(arg0: string): boolean;
 }

 export const UserSchema = new mongoose.Schema({
     email: { type: String, unique: true },
     password: { type: String },
     properties: { type: Object, default: {
            name: '',
            picture: ''
     } }
 });


 UserSchema.pre<IUserModel>('save', function (_next: any) {
     const user = this;
     if (!user.isModified('password')) {
         return _next();
     }
 
     bcrypt.genSalt(10, (_err: any, _salt: string) => {
         if (_err) {
             return _next(_err);
         }
 
         bcrypt.hash(user.password, _salt, (_err: any, _hash: string) => {
             if (_err) {
                 return _next(_err);
             }
 
             user.password = _hash;
             return _next();
         });
     });
 });
 


 
 const User = mongoose.model<IUser>('User', UserSchema);
 

 export default User;