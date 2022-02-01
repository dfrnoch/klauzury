import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../exceptions/HttpException';
import { Likes } from '../../../models/post/likes/likes.model';
import { response } from '../../../utils/response';

export class LikesController{


    public async getLikes(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const likes = await Likes.findOne({post: id})
            .populate({path: 'users', select: '-password -email -createdAt -updatedAt -__v'}) 

        if (!likes) return next(new HttpException(404, 'Post not found'));

        return response({ data: likes, res, next, statusCode: 200 });
    }


    public async likePost(req: Request, res: Response, next: NextFunction){
        const { id } = req.body;
        const post = await Likes.findOne({post: id});
        if (!post) return next(new HttpException(404, 'Post not found'));
        //       fix this
        const user: any = req.body.user._id;
        const isLiked = post.users.includes(user);

        if (isLiked) {
            const index = post.users.indexOf(user);
            post.users.splice(index, 1);
            await post.save();
        }else{
            post.users.push(user);
            await post.save();
        }
        return response({ data: post, res, next, statusCode: 200 });
    }
    
}