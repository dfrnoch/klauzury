import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../models.enums';
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
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    interests: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export const UserProfile = model<IUserProfile>(Models.USER_PROFILE, userProfileSchema);