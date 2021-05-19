import mongoose from 'mongoose';
import IUser from '@modules/user/user.interface';
const userSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: true },
    avatar: { type: String },
    password: { type: String },
    date: { type: Date, default: Date.now }
})
export default mongoose.model<IUser & mongoose.Document>("user", userSchema)