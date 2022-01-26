import { User } from '../../../models/user/user.model';

export class MeService {
    model = User;

    public async update(conditions: { [key: string]: any }, data: { [key: string]: any }){
        return this.model.findOneAndUpdate(conditions, data, { new: true });
    }

}