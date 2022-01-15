import express, {Application} from "express";
import dotevn from "dotenv";


dotevn.config();
const app: Application = express();






app.listen(process.env.port, () => {
    console.log('Server is running on port ' + process.env.port);
});