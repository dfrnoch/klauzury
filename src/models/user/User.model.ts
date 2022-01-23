
 import * as bcrypt from 'bcrypt';
 
 import { IUser } from './user.interface';
 import mongoose from 'mongoose';
 
 export interface IUserModel extends IUser, mongoose.Document {
    isModified(arg0: string): boolean;
 }

 export const UserSchema = new mongoose.Schema({
     email: { type: String, unique: true },
     password: { type: String }
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
 
 UserSchema.methods.comparePasswords = (decodedPassword: string, hashedPassword: string) => bcrypt.compare(decodedPassword, hashedPassword);


 
 const User = mongoose.model<IUser>('User', UserSchema);
 

 export default User;