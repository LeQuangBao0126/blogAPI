import { NextFunction } from "express";
import LoginDto from "./auth.dto";
import AuthService from './auth.services';


export default class AuthController {
    public authService = new AuthService();
    public login = async (req: any, res: any, next: NextFunction) => {
        const userLogin: LoginDto = req.body;
        try {
            let token = await this.authService.login(userLogin);
            return res.json(token)
        } catch (err) {
            next(err);
        }
    }
    public getCurrentLoginUser = async (req: any, res: any, next: NextFunction) => {
        try {
            let user = await this.authService.getCurrentLoginUser(req.user.id);
            return res.status(200).json(user)
        } catch (err) {
            next(err);
        }
    }


}