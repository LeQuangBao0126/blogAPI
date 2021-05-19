import { Route } from "@core/interfaces/Route";
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import Logger from '@core/utils/Logger';

import { errorMiddleware } from './core/middleware/error.middleware';
export default class App {
   public app: express.Application;
   public port: string | number;
   public isProduction: boolean = process.env.NODE_ENV == "production" ? true : false;

   constructor(routes: Route[]) {
      this.app = express();
      this.port = process.env.PORT || 5000;
      this.connectToDatabase()
      this.initializeMiddlewares();
      this.initialRoutesForApp(routes);
      this.app.use(errorMiddleware);
   }
   private initialRoutesForApp(routes: Route[]) {
      routes.forEach((route, index) => {
         this.app.use("/", route.router);
      })
   }
   public listen() {
      this.app.listen(this.port, () => { console.log(`server is running in ${this.port}`) })
   }
   public connectToDatabase() {
      let uri = `mongodb+srv://root:cBlLzWntn5LLLVWb@servercluster1.jps3e.mongodb.net/blogsystemapi?retryWrites=true&w=majority`;
      try {
         mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (!err) {
               Logger.info("connect database success")
            } else {
               console.log("connect database fail")
            }
         });
      } catch (err) {
         console.log(err)
      }
   }
   public initializeMiddlewares() {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }))
      if (this.isProduction) {
         this.app.use(helmet());
         this.app.use(morgan('combined'));
         this.app.use(cors({ origin: "", credentials: true }));
      } else {
         this.app.use(morgan('dev'));
         this.app.use(cors({ origin: true, credentials: true }));
      }

   }

}