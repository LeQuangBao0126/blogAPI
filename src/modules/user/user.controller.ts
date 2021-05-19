import { NextFunction, Request, Response } from 'express';
import UserService from './user.services';
import UserRegisterDto from './dtos/UserRegister';
import IUser from './user.interface';
import IPagination from '@core/interfaces/IPagination';
export default class UserController {
    private userService = new UserService();
    //register user 
    public register = async (req: any, res: any, next: NextFunction) => {
        try {
            const model: UserRegisterDto = req.body
            const tokenData = await this.userService.create(model);
            res.status(201).json(tokenData);
        } catch (err) {
            console.log("Lỗi ", err);
            next(err);
        }
    }
    public GetUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let userId = req.params.id;
            let user = await this.userService.findUserById(userId);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: UserRegisterDto = req.body;
            const user = await this.userService.updateUser(req.params.id, model);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };
    public getAllUser = async (req: any, res: any, next: NextFunction) => {
        try {
            let listUsers = await this.userService.getAllUser();
            res.status(200).json(listUsers);
        } catch (err) {
            next(err);
        }
    }
    public getUserPaging = async (req: any, res: any, next: NextFunction) => {
        try {
            let pagination: IPagination<IUser> = await this.userService.getUserPaging(+req.params.page, req.query.keyword);
            return res.status(200).json(pagination);
        } catch (err) {
            next(err);
        }
    }
}