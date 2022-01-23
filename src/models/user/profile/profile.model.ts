import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../models.enum';
import { IUserProfile } from './profile.interface';

const userProfileSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        unique: true,
        ref: Models.USER
    },
    bio: {
        type: SchemaTypes.String,
        default: 'Hello, I am a new user.'
    },
    gender: {
        type: SchemaTypes.String,
        default: 'UNKNOWN',
    }
}, {
    timestamps: true
});

export const UserProfile = model<IUserProfile>(Models.USER_PROFILE, userProfileSchema);