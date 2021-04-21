import { Request, Response } from "express";
import { Plan } from "../models/Plan";
import db from '../database/db';

const PlanDb = db.Plan;

export class PlanService {

    async get() {

        var models = await PlanDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await PlanDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Plan();
        model.name = request.body.name;
        model.description = request.body.description;
        model.value = request.body.value;
        model.isActive = request.body.isActive;

        const db = new PlanDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir o plano!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Plano criado com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await PlanDb.findOne({ id });
        
        var md = new Plan();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        md.description = request.body.description ? request.body.description : oldMd?.description;
        md.value = request.body.value ? request.body.value : oldMd?.value;
        md.isActive = request.body.isActive ? request.body.isActive : oldMd?.isActive;
        
        await PlanDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Plane não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Plano atualizado com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        PlanDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Plano não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Plano removido com sucesso!'
            });
        });
    }
}