import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { Post } from '../../models/post/post.model';
import { Likes } from '../../models/post/likes/likes.model';
import { response } from '../../utils/response';

export class PostController{
    
    public async getPost(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return next(new HttpException(404, 'Post not found'));

        return res.status(200).json(post);
    }

    public async getAllPosts(req: Request, res: Response, next: NextFunction){
        //TODO: add pagination
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return next(new HttpException(404, 'Post not found'));

        return res.status(200).json(post);
    }


    public async createPost(req: Request, res: Response, next: NextFunction){
        const { title, content, privacy } = req.body;
        const post = await Post.create({
            author: req.body.user._id,
            title,
            content,
            privacy
        });
        const likes = await Likes.create({
            post: post._id,
            users: []
        });


        return response({ data: [post, likes], res, next, statusCode: 201 });
    }
    
}