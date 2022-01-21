import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from "../routes";
import errorHandler from '../middlewares/errorHandler';


export default class ExpressLoader {
    public static async load(app: express.Application) {
        app.enable('trust proxy');
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.use(router);

        app.use(errorHandler.error)

        console.log('Express loaded');
    }
}

