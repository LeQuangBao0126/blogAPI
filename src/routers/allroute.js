import express from 'express';
const router = express.Router();
import { authMiddleware, errorMiddleware } from './../middlewares/middleware';
import indexController from '../controllers/indexController';
import userController from '../controllers/userController';
import postController from '../controllers/postController';
const initRoutes = (app) => {
    router.get("/", indexController.index);

    router.post("/login", userController.login);
    router.post("/register", userController.register);
    //get current user
    router.get("/auth/user", authMiddleware, userController.getCurrentUser);
    //post
    router.get("/post", postController.getAllPost); ///search keyword
    router.post("/post", authMiddleware, postController.createPost);
    router.put("/post/:id", authMiddleware, postController.editPost);
    router.delete("/post/:id", authMiddleware, postController.deletePost);
    router.get("/post/paging/:page", postController.getPostPaging);

    return app.use("/", router);
}
module.exports = initRoutes;