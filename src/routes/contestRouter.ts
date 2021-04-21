import { Router } from "express";
import contestController from "../controllers/contestController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', contestController.get);
routes.get('/:id', contestController.getById);
routes.post('/', auth.verifyJWT, contestController.insert);
routes.put('/:id', auth.verifyJWT, contestController.udpate);
routes.delete('/:id', auth.verifyJWT, contestController.delete);

export default routes;