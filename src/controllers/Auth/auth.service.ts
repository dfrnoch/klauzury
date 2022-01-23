import User from '../../models/user/user.model';

export class AuthService {
    public model = User;

    public get(conditions: { [key: string]: any }) {
        return this.model.findOne(conditions);
    };


    public async create (user: any) {
        const createdUser = await this.model.create({
            username: user.username,
            email: user.email,
            password: user.password
        });

        createdUser.profile = await UserProfile.create({ user: createdUser._id || createdUser.id });

        return createdUser;
    };

    public update (id: string, body: { [key: string]: any }) {
        return this.model.findByIdAndUpdate(id, body, { new: true });
    };
}