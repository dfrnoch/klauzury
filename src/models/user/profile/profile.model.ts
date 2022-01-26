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
        default: 'Hi, I\'m a new user!'
    },
    color: {
        type: SchemaTypes.String,
        default: '#000000'
    },
    gender: {
        type: String,
        default: 'UNKNOWN',
    }
}, {
    timestamps: true
});

export const UserProfile = model<IUserProfile>(Models.USER_PROFILE, userProfileSchema);