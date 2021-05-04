import { Router } from "express";
import institutionController from "../controllers/institutionController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', institutionController.get);
routes.get('/:id', institutionController.getById);
routes.post('/', auth.verifyJWT, institutionController.insert);
routes.put('/:id', auth.verifyJWT, institutionController.udpate);
routes.delete('/:id', auth.verifyJWT, institutionController.delete);

export default routes;