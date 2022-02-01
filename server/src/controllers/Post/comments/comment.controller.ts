import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../exceptions/HttpException';
import { Comments } from '../../../models/post/comments/comments.model';
import { Post } from '../../../models/post/post.model';
import { response } from '../../../utils/response';

export class CommentController{


    public async getComments(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const comments = await Comments.findOne({post: id})
            .populate({path: 'author', select: '-password -email'})

        if (!comments) return next(new HttpException(404, 'Post not found'));

        return response({ data: comments, res, next, statusCode: 200 });
    }

    public async commentPost(req: Request, res: Response, next: NextFunction){
        const { id, content } = req.body;
        const post = await Post.findById(id);
        if (!post) return next(new HttpException(404, 'Post not found'));

        const comment = await Comments.create({
            author: req.body.user._id,
            post: id,
            content
        });


        return response({ data: comment, res, next, statusCode: 200 });
    }
    
}