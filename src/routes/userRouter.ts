import { Router } from "express";
import userController from "../controllers/userController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', auth.verifyJWT, userController.get);
routes.get('/:id', userController.getById);
routes.get('/name/:name', userController.getByName);
routes.post('/login', userController.login);
routes.post('/logout', userController.logout);
routes.post('/', userController.insert);
routes.put('/:id', auth.verifyJWT, userController.udpate);
routes.delete('/:id', auth.verifyJWT, userController.delete);

export default routes;