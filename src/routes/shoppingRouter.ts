import { Router } from "express";
import shoppingController from "../controllers/shoppingController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', shoppingController.get);
routes.get('/:id', shoppingController.getById);
routes.post('/', auth.verifyJWT, shoppingController.insert);
routes.put('/:id', auth.verifyJWT, shoppingController.udpate);
routes.delete('/:id', auth.verifyJWT, shoppingController.delete);

export default routes;