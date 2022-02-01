import mongoose, { Schema } from "mongoose";
import { Models } from "../../models.enums";
import { IComment } from "./comments.interface";


let commentSchema = new Schema<IComment>({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Models.USER
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Models.POST
    },
    content: {
        type: String,
        required: [true, 'content is required'],
        maxlength: [2000, 'content must not contrain more than 2000 characters']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});



export const Comments = mongoose.model<IComment>(Models.COMMENTS, commentSchema);