import { Schema } from "mongoose";
import { Models } from "../models.enums";
import { IPost } from "./post.interface";
import { PostVirtuals } from "./post.enums";


export const setPostVirtuals = (postSchema: Schema<IPost>) => {
    postSchema.virtual(PostVirtuals.USER_PROFILE, {
        ref: Models.USER_PROFILE,
        foreignField: 'author',
        localField: '_id',
        justOne: true
    });
    postSchema.virtual(PostVirtuals.CATEGORY, {
        ref: Models.CATEGORY,
        foreignField: '_id',
        localField: 'category',
        justOne: true
    });
    postSchema.virtual(PostVirtuals.COMMENTS, {
        ref: Models.COMMENTS,
        foreignField: 'post',
        localField: '_id',
        justOne: false
    });
    postSchema.virtual(PostVirtuals.LIKES, {
        ref: Models.LIKES,
        foreignField: 'post',
        localField: '_id',
        justOne: false
    });

};