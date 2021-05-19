import mongoose from 'mongoose';

let PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});
module.exports = mongoose.model("post", PostSchema)