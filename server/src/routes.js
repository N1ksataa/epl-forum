import { Router } from 'express';
import userController from './controllers/userController.js';
import postController from './controllers/postController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/posts', postController);


export default routes;