import { Router } from 'express';

import { postValidator } from '../../../validators/Post/post.validator';
import { checkValidator } from '../../../middlewares/checkValidator.middleware';

import { PostController } from '../../../controllers/Post/post.controller';
import { authCheck } from '../../../middlewares/auth.middleware';

const router = Router();
const post = new PostController();

router
    .use(authCheck.check);


router.get('/:id', post.getPost)

    .get('/getPosts', post.getAllPosts)
    

    .post('/create',
    postValidator.post, checkValidator,
    post.createPost
    );


export default router; 