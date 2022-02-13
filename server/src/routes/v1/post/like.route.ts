import { Router } from 'express';

import { LikesController } from '../../../controllers/post/likes/likes.controller';
import { authCheck } from '../../../middlewares/auth.middleware';

const router = Router();
const likes = new LikesController();

router
    .use(authCheck.check);


router
    .get('/:id',
        likes.getLikes
    )

    .post('/post', 
        likes.likePost
        )
    



export default router; 