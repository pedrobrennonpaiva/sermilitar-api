import { Request, Response } from "express";
import { QuestionText } from "../models/QuestionText";
import db from '../database/db';

const QuestionTextDb = db.QuestionText;

export class QuestionTextService {

    async get() {

        var models = await QuestionTextDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await QuestionTextDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new QuestionText();
        model.text = request.body.text;

        const db = new QuestionTextDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir o texto!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Texto criado com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await QuestionTextDb.findOne({ id });
        
        var md = new QuestionText();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.text = request.body.text ? request.body.text : oldMd?.text;
        
        await QuestionTextDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Texto não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Texto atualizado com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        QuestionTextDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Texto não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Texto removido com sucesso!'
            });
        });
    }
}