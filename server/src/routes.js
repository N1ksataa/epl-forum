import { Router } from 'express';
import userController from './controllers/userController.js';
import postController from './controllers/postController.js';
import standingsController from './controllers/standingsController.js'

const routes = Router();

routes.use('/users', userController);
routes.use('/posts', postController);
routes.use('/standings', standingsController)


export default routes;