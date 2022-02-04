import { Router } from 'express';

import { postValidator } from '../../../validators/Post/post.validator';
import { checkValidator } from '../../../middlewares/checkValidator.middleware';

import { CommentController } from '../../../controllers/Post/comments/comment.controller';
import { authCheck } from '../../../middlewares/auth.middleware';

const router = Router();
const post = new CommentController();

router
    .use(authCheck.check);


router.get('/:id', post.getComments)


    .post('/post', 
    postValidator.comment, checkValidator,
    post.commentPost
    )


export default router; 