import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

export class BaseService<T extends mongoose.Document> {

    constructor(public model: Model<T, {}>) {
    }

    baseGet = (conditions: any) => {
        return this.model.findOne(conditions);
    };
}