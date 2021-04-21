import { Router } from "express";
import scholarityController from "../controllers/scholarityController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', scholarityController.get);
routes.get('/:id', scholarityController.getById);
routes.post('/', auth.verifyJWT, scholarityController.insert);
routes.put('/:id', auth.verifyJWT, scholarityController.udpate);
routes.delete('/:id', auth.verifyJWT, scholarityController.delete);

export default routes;