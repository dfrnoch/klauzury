import express, {Application} from "express";

import router from "./routes";

import Loader from "./loaders";


const app: Application = express();
Loader.load(app);



app.use("/", router)


app.listen(process.env.port, () => {
    console.log('Server is running on port ' + process.env.port);
});