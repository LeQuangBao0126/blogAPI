require('dotenv').config();
import App from './app';
import { IndexRoute } from './modules/index';
import { UserRoute } from './modules/user/user.route';
import { AuthRoute } from '@modules/auth/auth.route';
import { PostRoute } from '@modules/post/post.route';
const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new PostRoute()
]
const app = new App(routes);

app.listen();
