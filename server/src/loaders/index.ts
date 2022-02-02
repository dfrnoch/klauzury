
import ExpressLoader from "./express.loader";
import MongooseLoader from "./mongoose.loader";

import { Application } from "express";

class Loader {
  public static async load(app: Application) {
    await MongooseLoader.load();
    await ExpressLoader.load(app);
  }
}


export default Loader;