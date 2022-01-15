import express, {Application} from "express";
import dotevn from "dotenv";
import router from "./routes/api";
import bodyParser from "body-parser";

dotevn.config();
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use("/api", router)


app.listen(process.env.port, () => {
    console.log('Server is running on port ' + process.env.port);
});