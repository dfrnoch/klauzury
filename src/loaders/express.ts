import express from 'express';
import cors from 'cors';



export default class ExpressLoader {
    public static async load(app: express.Application) {
        app.enable('trust proxy');
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        console.log('Express loaded');
    }
}

