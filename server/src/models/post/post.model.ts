import mongoose, { Schema } from "mongoose";
import { Models } from "../models.enums";
import { IPost } from "./post.interface";
import { setPostVirtuals } from "./post.virtuals";



let postSchema = new Schema<IPost>({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Models.USER
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
    },
    privacy: {
        type: String,
        enum: [
            'PUBLIC',
            'JUST_FOLLOWERS'
        ]
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


setPostVirtuals(postSchema);


export const Post = mongoose.model<IPost>(Models.POST, postSchema);