import { Request, Response } from "express";
import { SubjectMatter } from "../models/SubjectMatter";
import db from '../database/db';

const SubjectMatterDb = db.SubjectMatter;
const SubjectDb = db.Subject;

export class SubjectMatterService {

    async get() {

        var models = await SubjectMatterDb.find().lean();

        for(var model of models)
        {
            model.subject = await SubjectDb.findOne({ id: model?.subjectId });
        }

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await SubjectMatterDb.findOne({ id }).lean();
            model!.subject = model?.subject !== null ? await SubjectDb.findOne({ id: model?.subjectId }) : null;

            return model;
        }
        catch
        {
            return null;
        }
    }

    async getBySubjectId(subjectId: string) {
        
        try
        {
            var models = await SubjectMatterDb.find({ subjectId }).lean();

            for(var model of models)
            {
                model.subject = await SubjectDb.findOne({ id: model?.subjectId });
            }

            return models;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new SubjectMatter();
        model.name = request.body.name;
        model.subjectId = request.body.subjectId;

        var subject = await SubjectDb.findOne({ id: model.subjectId });

        if(!subject)
        {
            response.status(500).send({ 
                success: false, 
                message: 'Matéria não existe!'
            });
            return;
        }

        const db = new SubjectMatterDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir o assunto!',
                    error: err
                });
            }
            else {
                model.subject = subject;

                response.status(201).send({ 
                    success: true, 
                    message: 'Assunto criado com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await SubjectMatterDb.findOne({ id });
        
        var md = new SubjectMatter();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        md.subjectId = request.body.subjectId ? request.body.subjectId : oldMd?.subjectId;
        
        var subject = await SubjectDb.findOne({ id: md.subjectId });

        if(!subject)
        {
            response.status(500).send({ 
                success: false, 
                message: 'Matéria não existe!'
            });
            return;
        }

        await SubjectMatterDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Assunto não encontrado!',
                    error: err
                });
            }
            else
            {
                model.subject = subject;
                
                response.status(200).send({ 
                    success: true, 
                    message: 'Assunto atualizado com sucesso!',
                    model
                });
            }
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        SubjectMatterDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Assunto não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Assunto removido com sucesso!'
            });
        });
    }
}