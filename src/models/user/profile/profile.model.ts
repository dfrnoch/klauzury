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
        maxlength: [255, 'field \'biography\' must contain no more than 255 characters']
    },
    gender: {
        type: SchemaTypes.String,
        enum: ['M' /*MALE*/, 'F' /*FEMALE*/, 'UNKNOWN'],
        default: 'UNKNOWN',
    }
}, {
    timestamps: true
});

export const UserProfile = model<IUserProfile>(Models.USER_PROFILE, userProfileSchema);