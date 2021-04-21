import { Router } from "express";
import patentController from "../controllers/patentController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', patentController.get);
routes.get('/:id', patentController.getById);
routes.post('/', auth.verifyJWT, patentController.insert);
routes.put('/:id', auth.verifyJWT, patentController.udpate);
routes.delete('/:id', auth.verifyJWT, patentController.delete);

export default routes;