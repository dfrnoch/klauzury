import { Router } from 'express';

import { LikesController } from '../../../controllers/post/likes/likes.controller';
import { checkJwt } from '../../../middlewares/checkJwt.middleware';

const router = Router();
const likes = new LikesController();

router
    .use(checkJwt.check);


router
    .get('/:id',
        likes.getLikes
    )

    .post('/post', 
        likes.likePost
        )
    



export default router; 