import { Request, Response } from "express";
import { ArmedForce } from "../models/ArmedForce";
import db from '../database/db';

const ArmedForceDb = db.ArmedForce;

export class ArmedForceService {

    async get() {

        var models = await ArmedForceDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await ArmedForceDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new ArmedForce();
        model.name = request.body.name;

        const db = new ArmedForceDb(model);
        
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

        var oldMd = await ArmedForceDb.findOne({ id });
        
        var md = new ArmedForce();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        
        await ArmedForceDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
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
        
        ArmedForceDb.remove({ id }, (err: any) => {
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