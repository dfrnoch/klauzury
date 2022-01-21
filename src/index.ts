import express, { Application } from "express";

import config from "./config";
import Loader from "./loaders";


const app: Application = express();
Loader.load(app);


app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port);
});
