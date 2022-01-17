import express, { Application } from "express";

import router from "./routes";
import config from "./config";
import Loader from "./loaders";

(async () => {

    const app: Application = express();
    Loader.load(app);

    app.use(router);


    app.listen(config.port, () => {
        console.log('Server is running on port ' + config.port);
    });

})()