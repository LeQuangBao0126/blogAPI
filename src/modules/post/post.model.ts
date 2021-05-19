import mongoose from 'mongoose';
import IPost from '@modules/post/post.interface';
const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    userPost: String
})
export default mongoose.model<IPost & mongoose.Document>("post", PostSchema)