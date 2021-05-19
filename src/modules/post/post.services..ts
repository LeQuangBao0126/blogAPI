import IPost from './post.interface';
import PostModel from './post.model';


export default class PostService {

    async getAllPost(): Promise<any> {
        let posts = await PostModel.find();
        return posts;
    }
    async createPost(item: IPost) {
        let postInserted = await PostModel.create(item);
        return postInserted;
    }
}