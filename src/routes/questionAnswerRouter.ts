import { Router } from "express";
import questionAnswerController from "../controllers/questionAnswerController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', questionAnswerController.get);
routes.get('/:id', questionAnswerController.getById);
routes.post('/', auth.verifyJWT, questionAnswerController.insert);
routes.put('/:id', auth.verifyJWT, questionAnswerController.udpate);
routes.delete('/:id', auth.verifyJWT, questionAnswerController.delete);

export default routes;