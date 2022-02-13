import mongoose, { Schema } from "mongoose";
import { Models } from "../../models.enums";
import { ILikes } from "./likes.interface";


let likesSchema = new Schema<ILikes>({
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Models.POST
    },
    users: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: Models.USER
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});



export const Likes = mongoose.model<ILikes>(Models.LIKES, likesSchema);