
import mongoose from "mongoose";
import config from "../config";

export default class DatabaseLoader {
    public static async load() {
        await mongoose.connect(config.databaseURL);
        console.log('Database loaded');
    }
}

