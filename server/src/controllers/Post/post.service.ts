import { Post } from '../../models/post/post.model';
import { PostVirtuals } from '../../models/post/post.enums';

export class PostService {
    comment(arg0: { _id: string; content: any; }) {
        throw new Error('Method not implemented.');
    }
    delete(arg0: { _id: string; }) {
        throw new Error('Method not implemented.');
    }

    model = Post;

    public getOne(conditions: { [key: string]: any }){
        return this.model.findOne(conditions);
    }

    public getMany(conditions: { [key: string]: any }){
        return this.model.find(conditions);
    }

    public getOneWithAll(conditions: { [key: string]: any }){
        return this.model.findOne(conditions).populate(PostVirtuals.COMMENTS, PostVirtuals.LIKES);
    }

    public create(data: { [key: string]: any }){
        return this.model.create(data);
    }

    public update(arg: { _id: string; title: any; content: any; privacy: any; }) {
        return this.model.updateOne({ _id: arg._id }, { $set: { title: arg.title, content: arg.content, privacy: arg.privacy } });
    }


}