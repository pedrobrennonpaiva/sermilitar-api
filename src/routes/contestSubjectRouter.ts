import { Router } from "express";
import contestSubjectController from "../controllers/contestSubjectController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', contestSubjectController.get);
routes.get('/:id', contestSubjectController.getById);
routes.post('/', auth.verifyJWT, contestSubjectController.insert);
routes.put('/:id', auth.verifyJWT, contestSubjectController.udpate);
routes.delete('/:id', auth.verifyJWT, contestSubjectController.delete);

export default routes;