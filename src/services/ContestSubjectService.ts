import { Request, Response } from "express";
import { ContestSubject } from "../models/ContestSubject";
import db from '../database/db';

const ContestSubjectDb = db.ContestSubject;

export class ContestSubjectService {

    async get() {

        var models = await ContestSubjectDb.find().lean();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await ContestSubjectDb.findOne({ id }).lean();

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new ContestSubject();
        model.contestId = request.body.contestId;
        model.subjectId = request.body.subjectId;

        const db = new ContestSubjectDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a concurso/matéria!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Concurso/matéria criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await ContestSubjectDb.findOne({ id });
        
        var md = new ContestSubject();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.contestId = request.body.contestId ? request.body.contestId : oldMd?.contestId;
        md.subjectId = request.body.subjectId ? request.body.subjectId : oldMd?.subjectId;
        
        await ContestSubjectDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Concurso/matéria não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Concurso/matéria atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        ContestSubjectDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Concurso/matéria não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Concurso/matéria removida com sucesso!'
            });
        });
    }
}