
import ExpressLoader from "./express";
import MongooseLoader from "./mongoose";

import { Application } from "express";

class Loader {
  public static async load(app: Application) {
    await MongooseLoader.load();
    await ExpressLoader.load(app);
    }
}


export default Loader;