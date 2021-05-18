import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
module.exports = mongoose.model("user", UserSchema)