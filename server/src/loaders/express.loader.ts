import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import AuthRoute from "../routes/v1/auth.route";
import TestRoute from "../routes/v1/test.route";
import PostRoute from "../routes/v1/post/post.route";
// import UserRoute from "../routes/v1/User/user.route";
// import MeRoute from "../routes/v1/User/me.route";



import errorHandler from '../middlewares/errorHandler.middleware';


export default class ExpressLoader {
    public static load(app: express.Application) {
        app.enable('trust proxy');
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.use('/api/v1/auth', AuthRoute);
        app.use('/api/v1/post', PostRoute);
        app.use('/api/v1/test', TestRoute);
        // app.use('/api/v1/user' UserRoute);
        // app.use('/api/v1/user/me' MeRoute)

        app.use(errorHandler.error)

        console.log('Express loaded');
    }
}

