
import ExpressLoader from "./express.loader";
import DatabaseLoader from "./database.loader";

import { Application } from "express";

class Loader {
  public static async load(app: Application) {
    await DatabaseLoader.load();
    await ExpressLoader.load(app);
  }
}


export default Loader;