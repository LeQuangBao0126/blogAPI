import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import initRoutes from './routers/allroute';
let app = express();
let port = process.env.PORT || 5000;
let uri = `mongodb+srv://root:cBlLzWntn5LLLVWb@servercluster1.jps3e.mongodb.net/blogsystemapi?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("connect ok ");
    } else {
        console.log("connect khong");
    }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initRoutes(app);



app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})