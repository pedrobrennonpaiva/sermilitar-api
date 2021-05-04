import { Request, Response } from "express";
import { Institution } from "../models/Institution";
import db from '../database/db';

const InstitutionDb = db.Institution;

export class InstitutionService {

    async get() {

        var models = await InstitutionDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await InstitutionDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Institution();
        model.name = request.body.name;

        const db = new InstitutionDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a força armada!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Força armada criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await InstitutionDb.findOne({ id });
        
        var md = new Institution();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        
        await InstitutionDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Força armada não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Força armada atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        InstitutionDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Força armada não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Força armada removida com sucesso!'
            });
        });
    }
}