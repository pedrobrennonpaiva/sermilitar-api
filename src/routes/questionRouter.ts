import { Router } from "express";
import questionController from "../controllers/questionController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', questionController.get);
routes.get('/:id', questionController.getById);
routes.post('/', auth.verifyJWT, questionController.insert);
routes.put('/:id', auth.verifyJWT, questionController.udpate);
routes.delete('/:id', auth.verifyJWT, questionController.delete);

export default routes;