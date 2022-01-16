import express, {Application} from "express";
import dotenv from "dotenv";
import router from "./routes/api";
import bodyParser from "body-parser";
import mongoose from "mongoose";



dotenv.config();


mongoose.connect(process.env.MONGO_URI as string);


const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use("/api", router)


app.listen(process.env.port, () => {
    console.log('Server is running on port ' + process.env.port);
});