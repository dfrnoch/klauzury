import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import { PostService } from './post.service';

export class PostController{
    private postService: PostService;

    constructor(){
        this.postService = new PostService();
        this.getPost = this.getPost.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    public async getPost(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const post = await this.postService.getOne({ _id: id });
        if (!post) return next(new HttpException(404, 'Post not found'));

        return res.status(200).json(post);
    }

    public async createPost(req: Request, res: Response, _next: NextFunction){
        const { title, content, privacy } = req.body;
        const post = await this.postService.create({ author:req.body.user._id, title, content, privacy });
        return res.status(201).json(post);
    }
    
}