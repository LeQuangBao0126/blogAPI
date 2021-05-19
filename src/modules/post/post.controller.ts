
import IPagination from '@core/interfaces/IPagination';
import { NextFunction, Request, Response } from 'express';
import PostService from './post.services.';
export default class PostController {
    private postService = new PostService();
    public getAllPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let listPost = await this.postService.getAllPost();
            res.status(201).json(listPost);
        } catch (err) {
            next(err);
        }
    }
    public getPostPaging = async (req: Request, res: Response, next: NextFunction) => {

    }
    public createPost = async (req: any, res: Response, next: NextFunction) => {
        try {
            let postItem = req.body;
            postItem = {
                ...postItem,
                userPost: req.user.id
            }
            let listPost = await this.postService.createPost(postItem);
            res.status(201).json(listPost);
        } catch (err) {
            next(err);
        }
    }
}