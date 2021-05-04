import { Request, Response } from "express";
import { ExaminingBoard } from "../models/ExaminingBoard";
import db from '../database/db';

const ExaminingBoardDb = db.ExaminingBoard;

export class ExaminingBoardService {

    async get() {

        var models = await ExaminingBoardDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await ExaminingBoardDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new ExaminingBoard();
        model.name = request.body.name;

        const db = new ExaminingBoardDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a banca!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Banca criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await ExaminingBoardDb.findOne({ id });
        
        var md = new ExaminingBoard();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        
        await ExaminingBoardDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Banca não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Banca atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        ExaminingBoardDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Banca não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Banca removida com sucesso!'
            });
        });
    }
}