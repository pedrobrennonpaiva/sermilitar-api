import { Request, Response } from "express";
import { QuestionAnswer } from "../models/QuestionAnswer";
import db from '../database/db';

const QuestionAnswerDb = db.QuestionAnswer;

export class QuestionAnswerService {

    async get() {

        var models = await QuestionAnswerDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await QuestionAnswerDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new QuestionAnswer();
        model.questionId = request.body.questionId;
        model.alternativeId = request.body.alternativeId;
        model.userId = request.body.userId;

        const db = new QuestionAnswerDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a resposta!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Resposta criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await QuestionAnswerDb.findOne({ id });
        
        var md = new QuestionAnswer();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.questionId = request.body.questionId ? request.body.questionId : oldMd?.questionId;
        md.alternativeId = request.body.alternativeId ? request.body.alternativeId : oldMd?.alternativeId;
        md.userId = request.body.userId ? request.body.userId : oldMd?.userId;
        
        await QuestionAnswerDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Resposta não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Resposta atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        QuestionAnswerDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Resposta não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Resposta removida com sucesso!'
            });
        });
    }
}