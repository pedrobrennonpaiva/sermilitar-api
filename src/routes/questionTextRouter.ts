import { Router } from "express";
import questionTextController from "../controllers/questionTextController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', questionTextController.get);
routes.get('/:id', questionTextController.getById);
routes.post('/', auth.verifyJWT, questionTextController.insert);
routes.put('/:id', auth.verifyJWT, questionTextController.udpate);
routes.delete('/:id', auth.verifyJWT, questionTextController.delete);

export default routes;