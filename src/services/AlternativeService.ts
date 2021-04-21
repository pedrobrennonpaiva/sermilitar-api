import { Request, Response } from "express";
import { Alternative } from "../models/Alternative";
import db from '../database/db';

const AlternativeDb = db.Alternative;

export class AlternativeService {

    async get() {

        var models = await AlternativeDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await AlternativeDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Alternative();
        model.text = request.body.text;
        model.questionId = request.body.questionId;
        model.position = request.body.position;
        model.isCorrect = request.body.isCorrect;

        const db = new AlternativeDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a alternativa!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Alternativa criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await AlternativeDb.findOne({ id });
        
        var md = new Alternative();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.text = request.body.text ? request.body.text : oldMd?.text;
        md.questionId = request.body.questionId ? request.body.questionId : oldMd?.questionId;
        md.position = request.body.position ? request.body.position : oldMd?.position;
        md.isCorrect = request.body.isCorrect ? request.body.isCorrect : oldMd?.isCorrect;
        
        await AlternativeDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Alternativa não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Alternativa atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        AlternativeDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Alternativa não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Alternativa removida com sucesso!'
            });
        });
    }
}