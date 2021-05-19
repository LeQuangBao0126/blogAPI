import { DataStoreInToken } from "@modules/auth";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    let token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: "UnAuthorize" })
    }
    //token = token.split(" ")[1];
    try {
        const secret: string = "secret";
        let userVerify = jwt.verify(token, secret) as DataStoreInToken;
        req.user = userVerify
        next()
    } catch (err) {
        console.log(err);
        next(err);
    }
    //  req.user.id = userVerify.id;
}