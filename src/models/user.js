import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    email: String,
    password: String
});
module.exports = mongoose.model("user", UserSchema)