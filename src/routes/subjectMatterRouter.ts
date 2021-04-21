import { Router } from "express";
import subjectMatterController from "../controllers/subjectMatterController";
import { auth } from "../configs/auth";

const routes = Router();

routes.get('/', subjectMatterController.get);
routes.get('/:id', subjectMatterController.getById);
routes.get('/subject/:subjectId', subjectMatterController.getBySubjectId);
routes.post('/', auth.verifyJWT, subjectMatterController.insert);
routes.put('/:id', auth.verifyJWT, subjectMatterController.udpate);
routes.delete('/:id', auth.verifyJWT, subjectMatterController.delete);

export default routes;