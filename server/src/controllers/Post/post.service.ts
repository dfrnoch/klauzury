import { Model } from "mongoose";


class PostService{ 
    // private model: Model<any>; make it better


    public getLikes(model: Model<any>){
        return model.find();
    }



}