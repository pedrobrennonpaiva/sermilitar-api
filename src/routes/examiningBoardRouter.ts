import { Router } from "express";
import examiningBoardController from "../controllers/examiningBoardController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', examiningBoardController.get);
routes.get('/:id', examiningBoardController.getById);
routes.post('/', auth.verifyJWT, examiningBoardController.insert);
routes.put('/:id', auth.verifyJWT, examiningBoardController.udpate);
routes.delete('/:id', auth.verifyJWT, examiningBoardController.delete);

export default routes;