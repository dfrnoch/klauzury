import { User } from '../../models/user/user.model';
import { UserVirtuals } from '../../models/user/user.enums';

export class UserService {
    model = User;

    public async getOne(conditions: { [key: string]: any }){
        return this.model.findOne(conditions);
    }

    public async getMany(conditions: { [key: string]: any }){
        return this.model.find(conditions);
    }

    public async getOneWithProfile(conditions: { [key: string]: any }){
        return this.model.findOne(conditions).populate(UserVirtuals.PROFILE);
    }


}