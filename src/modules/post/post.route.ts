import { Route } from '@core/interfaces/Route';
import { Router } from 'express';
import { validateMiddleware } from '@core/middleware/validationRequest.middleware';
import PostController from './post.controller';
import { authMiddleware } from '@core/middleware/auth.middleware';
//chuyen json qua class rồi thử validate class

export class PostRoute implements Route {
    public path: string = "/api/posts";
    public router: Router = Router();
    public postController = new PostController();
    constructor() {
        this.initializeRoute();
    }
    public initializeRoute() {
        this.router.get(this.path, this.postController.getAllPost);
        this.router.get(this.path + "/paging", this.postController.getPostPaging);
        /// them sua xoa bai viet
        this.router.post(this.path, authMiddleware, this.postController.createPost)

    }


}