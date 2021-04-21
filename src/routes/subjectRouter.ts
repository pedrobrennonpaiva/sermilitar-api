import { Router } from "express";
import subjectController from "../controllers/subjectController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', subjectController.get);
routes.get('/:id', subjectController.getById);
routes.post('/', auth.verifyJWT, subjectController.insert);
routes.put('/:id', auth.verifyJWT, subjectController.udpate);
routes.delete('/:id', auth.verifyJWT, subjectController.delete);

export default routes;