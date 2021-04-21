import { Router } from "express";
import armedForceController from "../controllers/armedForceController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', armedForceController.get);
routes.get('/:id', armedForceController.getById);
routes.post('/', auth.verifyJWT, armedForceController.insert);
routes.put('/:id', auth.verifyJWT, armedForceController.udpate);
routes.delete('/:id', auth.verifyJWT, armedForceController.delete);

export default routes;