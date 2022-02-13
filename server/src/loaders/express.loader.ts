import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';
import cookieSession from 'cookie-session';

import DiscordRoute from "../routes/v1/oauth/discord.route";
import GithubRoute from "../routes/v1/oauth/github.route";
import TestRoute from "../routes/v1/test.route";
import PostRoute from "../routes/v1/post/post.route";
import CommentsRoute from "../routes/v1/post/comment.route";
import LikesRoute from "../routes/v1/post/like.route";

import UserRoute from "../routes/v1/User/user.route";
import MeRoute from "../routes/v1/User/me.route";


import "../middlewares/strategies/discord.strategy";
import "../middlewares/strategies/github.strategy";


import errorHandler from '../middlewares/errorHandler.middleware';


export default class ExpressLoader {
    public static load(app: express.Application) {
        app.enable('trust proxy');
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(cookieSession({
            name: 'session',
            keys: ['ss', 'sasa']
        }))

        app.use(passport.initialize());
        app.use(passport.session());

        app.use('/api/v1/oauth/discord', DiscordRoute);
        app.use('/api/v1/oauth/github', GithubRoute);

        app.use('/api/v1/test', TestRoute);

        
        app.use('/api/v1/post', PostRoute);
        app.use('/api/v1/likes', LikesRoute);
        app.use('/api/v1/comments', CommentsRoute);

        app.use('/api/v1/user', UserRoute);
        app.use('/api/v1/user/me', MeRoute)

        app.use(errorHandler.error)

        console.log('Express loaded');
    }
}
