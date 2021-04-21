import { Request, Response } from "express";
import { Scholarity } from "../models/Scholarity";
import db from '../database/db';

const ScholarityDb = db.Scholarity;

export class ScholarityService {

    async get() {

        var models = await ScholarityDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await ScholarityDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Scholarity();
        model.name = request.body.name;

        const db = new ScholarityDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a escolaridade!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Escolaridade criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await ScholarityDb.findOne({ id });
        
        var md = new Scholarity();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        
        await ScholarityDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Escolaridade não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Escolaridade atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        ScholarityDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Escolaridade não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Escolaridade removida com sucesso!'
            });
        });
    }
}