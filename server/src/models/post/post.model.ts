import mongoose, { Schema, SchemaTypes } from "mongoose";
import { Models } from "../models.enums";
import { IPost } from "./post.interface";
import { setPostVirtuals } from "./post.virtuals";



let postSchema = new Schema<IPost>({
    author: {
        type: SchemaTypes.ObjectId,
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
    likes: {
        type: Number,
        default: 0,
    },
    category: {
        type: SchemaTypes.ObjectId,
        ref: Models.CATEGORY
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


setPostVirtuals(postSchema);


export const Post = mongoose.model<IPost>(Models.POST, postSchema);