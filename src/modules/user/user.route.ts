import UserController from './user.controller';
import { Route } from '@core/interfaces/Route';
import { Router } from 'express';
import { validateMiddleware } from '@core/middleware/validationRequest.middleware';
import UserRegisterDto from '@modules/user/dtos/UserRegister'
//chuyen json qua class rồi thử validate class

export class UserRoute implements Route {
    public path: string = "/api/user";
    public router: Router = Router();
    public userController = new UserController();
    constructor() {
        this.initializeRoute();
    }
    public initializeRoute() {
        this.router.post(this.path + "/register", validateMiddleware(UserRegisterDto, true), this.userController.register);
        this.router.get(this.path + "/:id", this.userController.GetUserById);
        this.router.put(
            this.path + '/:id',
            validateMiddleware(UserRegisterDto, true),
            this.userController.updateUser
        );
        this.router.get(this.path, this.userController.getAllUser);
        this.router.get(this.path + '/paging/:page', this.userController.getUserPaging);
        /// 
        ///Get all post of user 


    }

}