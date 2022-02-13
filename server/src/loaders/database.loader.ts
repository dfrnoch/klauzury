
import mongoose from "mongoose";
import config from "../config";

export default class DatabaseLoader {
    public static async load(): Promise<void> {
        let retries = 5;
        while (retries) {
            try {
                await mongoose.connect(config.databaseURL);
                console.log("Mongo Loaded");
                break;
            } catch (e) {
                console.log(e);
                retries -= 1;
                console.log("Error, retrying: ", retries);
                await new Promise((res) => setTimeout(res, 5000));
            }
        }
    }
}

