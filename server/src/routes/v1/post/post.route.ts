import { Router } from 'express';

import { postValidator } from '../../validators/Post/post.validator';
import { checkValidator } from '../../middlewares/checkValidator.middleware';

import { PostController } from '../../controllers/Post/post.controller';
import { checkJwt } from '../../middlewares/checkJwt.middleware';

const router = Router();
const post = new PostController();

router
    .use(checkJwt.check);


router.get('/:id', post.getPost)

    .get('/:id/comments'
    )

    .post('/:id/comment', 
    postValidator.coment, checkValidator,
    post.commentPost)
    
    .post('/:id/like', post.likePost)
    

    .post('/create',
    postValidator.post, checkValidator,
    post.createPost
    );


export default router; 