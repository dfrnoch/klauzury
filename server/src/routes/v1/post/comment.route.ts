import { Router } from 'express';

import { postValidator } from '../../../validators/Post/post.validator';
import { checkValidator } from '../../../middlewares/checkValidator.middleware';

import { CommentController } from '../../../controllers/Post/comments/comment.controller';
import { checkJwt } from '../../../middlewares/checkJwt.middleware';

const router = Router();
const post = new CommentController();

router
    .use(checkJwt.check);


router.get('/:id', post.getComments)


    .post('/post', 
    postValidator.comment, checkValidator,
    post.commentPost
    )


export default router; 