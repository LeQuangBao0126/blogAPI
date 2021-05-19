import { NextFunction, Request, Response } from "express";
import HttpException from './../../core/Exception/http.exception';
export default class IndexController {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).send("API is runging ")
            //next(new HttpException(404, "sai duong dan"));
        } catch (err) {
            next(err);
        }
    }
}