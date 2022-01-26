import { User } from '../../../models/user/user.model';
import { UserVirtuals } from '../../../models/user/user.enums';

export class MeService {
    model = User;

    public async getOne(conditions: { [key: string]: any }){
        return this.model.findOne(conditions);
    }

    public async getMany(conditions: { [key: string]: any }){
        return this.model.find(conditions);
    }



}