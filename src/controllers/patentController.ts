import { Request, Response } from "express";
import { PatentService } from "../services/PatentService";

var service = new PatentService();

export default {

    async get(_: Request, response: Response) {

        var users = await service.get();

        response.status(200).send(users);
    },

    async getById(request: Request, response: Response) {

        var user = await service.getById(request.params.id);

        response.status(200).send(user);
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
