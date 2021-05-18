import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/user';
let app = express();
let port = process.env.PORT || 5000;
let uri = `mongodb+srv://root:jBXzgCSMXZHgfeeY@servercluster1.jps3e.mongodb.net/blogsystemapi?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("connect ok ");
    } else {
        console.log("connect khong");
    }
});
app.get("/user", async (req, res) => {
    let users = await UserModel.find({});
    if (users) {
        return res.send(users)
    }
    return res.send({ message: "No user" })
})

app.get("/", (req, res) => {
    res.send("hello word")
})
app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})