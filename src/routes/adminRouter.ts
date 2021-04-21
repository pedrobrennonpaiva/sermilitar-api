import { Router } from "express";
import adminController from "../controllers/adminController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', auth.verifyJWT, adminController.get);
routes.get('/:id', adminController.getById);
routes.get('/name/:name', adminController.getByName);
routes.post('/login', adminController.login);
routes.post('/logout', adminController.logout);
routes.post('/', adminController.insert);
routes.put('/:id', auth.verifyJWT, adminController.udpate);
routes.delete('/:id', auth.verifyJWT, adminController.delete);

export default routes;