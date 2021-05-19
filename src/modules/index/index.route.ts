import IndexController from './index.controller';
import { Route } from '@core/interfaces/Route';
import { Router } from 'express';

export default class IndexRoute implements Route {
    public path: string = "/";
    public router: Router = Router();

    constructor() {
        this.initializeRoute();
    }
    public initializeRoute() {
        this.router.get(this.path, new IndexController().index);
    }

}