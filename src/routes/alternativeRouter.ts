import { Router } from "express";
import alternativeController from "../controllers/alternativeController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', alternativeController.get);
routes.get('/:id', alternativeController.getById);
routes.post('/', auth.verifyJWT, alternativeController.insert);
routes.put('/:id', auth.verifyJWT, alternativeController.udpate);
routes.delete('/:id', auth.verifyJWT, alternativeController.delete);

export default routes;