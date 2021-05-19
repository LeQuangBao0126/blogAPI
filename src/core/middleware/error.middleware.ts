import { NextFunction, Request, Response } from "express";
import Logger from '@core/utils/Logger';
import HttpException from "./../Exception/http.exception";

export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = err.status || 500;  //bắt từ err .
    const message: string = err.message || "something went wrong !";
    Logger.error(`Error ${status}  - Message ${message}`);
    return res.status(status).json({ message: message })
}