import { Router } from "express";
import planController from "../controllers/planController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', planController.get);
routes.get('/:id', planController.getById);
routes.post('/', auth.verifyJWT, planController.insert);
routes.put('/:id', auth.verifyJWT, planController.udpate);
routes.delete('/:id', auth.verifyJWT, planController.delete);

export default routes;