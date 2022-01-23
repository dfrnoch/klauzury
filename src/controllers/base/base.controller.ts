
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export abstract class BaseController {
    protected constructor(private readonly model: mongoose.Model<Document>) {
    }

    public async baseGet(_req: any, res: any, _next: any)  {
        res.send(await this.model.find());
    };

}