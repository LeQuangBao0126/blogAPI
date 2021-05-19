import { Route } from "@core/interfaces/Route";
import { Router } from "express";
import AuthController from './auth.controller';
import { validateMiddleware } from '@core/middleware/validationRequest.middleware';
import LoginDto from '@modules/auth/auth.dto';
import { authMiddleware } from '@core/middleware/auth.middleware';
export class AuthRoute implements Route {
    public path: string = "/api/auth";
    public router: Router = Router();
    public authController = new AuthController();
    constructor() {
        this.initializeRoute();
    }
    public initializeRoute() {
        this.router.post(this.path + "/login", validateMiddleware(LoginDto, true), this.authController.login);
        this.router.get(this.path, authMiddleware, this.authController.getCurrentLoginUser);
    }
}