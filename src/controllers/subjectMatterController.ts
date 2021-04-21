import { Request, Response } from "express";
import { SubjectMatterService } from "../services/SubjectMatterService";

var service = new SubjectMatterService();

export default {

    async get(_: Request, response: Response) {

        var models = await service.get();

        response.status(200).send(models);
    },

    async getById(request: Request, response: Response) {

        var model = await service.getById(request.params.id);

        response.status(200).send(model);
    },

    async getBySubjectId(request: Request, response: Response) {

        var models = await service.getBySubjectId(request.params.subjectId);

        response.status(200).send(models);
    },

    async insert(request: Request, response: Response) {

        await service.insert(request, response);
    },

    async udpate(request: Request, response: Response) {

        await service.update(request, response);
    },

    async delete(request: Request, response: Response) {

        await service.delete(request, response);
    },
}
