import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { Likes } from '../../models/post/likes/likes.model';


export class LikesController{
    private model;

    constructor(){
        this.model = Likes
    }

    public async getLikes(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const post = await this.model.findById(id);
        if (!post) return next(new HttpException(404, 'Post not found'));

        return res.status(200).json(post);
    }

    public async createPost(req: Request, res: Response, _next: NextFunction){
        const { title, content, privacy } = req.body;
        const post = await this.model.create({
            author: req.body.user._id,
            title,
            content,
            privacy
        });

        return res.status(201).json(post);
    }
    
}