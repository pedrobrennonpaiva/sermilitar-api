import { Request, Response } from "express";
import { Question } from "../models/Question";
import db from '../database/db';

const QuestionDb = db.Question;
const ContestDb = db.Contest;
const SubjectDb = db.Subject;
const SubjectMatterDb = db.SubjectMatter;
const QuestionTextDb = db.QuestionText;

export class QuestionService {

    async get() {

        var models = await QuestionDb.find().lean();

        for(var model of models)
        {
            model.contest = await ContestDb.findOne({ id: model?.contestId });
            model.subject = await SubjectDb.findOne({ id: model?.subjectId });
            model.subjectMatter = await SubjectMatterDb.findOne({ id: model?.subjectMatterId });
            model.questionText = await QuestionTextDb.findOne({ id: model?.questionTextId });
        }

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await QuestionDb.findOne({ id }).lean();

            model!.contest = model?.contest !== null ? await ContestDb.findOne({ id: model?.contestId }) : null;
            model!.subject = model?.subject !== null ? await SubjectDb.findOne({ id: model?.subjectId }) : null;
            model!.subjectMatter = model?.subjectMatter !== null ? await SubjectMatterDb.findOne({ id: model?.subjectMatterId }) : null;
            model!.questionText = model?.questionText !== null ? await QuestionTextDb.findOne({ id: model?.questionTextId }) : null;

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Question();
        model.ask = request.body.ask;
        model.imageUrl = request.body.imageUrl;
        model.questionTextId = request.body.questionTextId;
        model.contestId = request.body.contestId;
        model.subjectId = request.body.subjectId;
        model.subjectMatterId = request.body.subjectMatterId;
        model.isCanceled = request.body.isCanceled;
        model.solution = request.body.solution;

        const db = new QuestionDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a questão!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Questão criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await QuestionDb.findOne({ id });
        
        var md = new Question();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.ask = request.body.ask ? request.body.ask : oldMd?.ask;
        md.imageUrl = request.body.imageUrl ? request.body.imageUrl : oldMd?.imageUrl;
        md.questionTextId = request.body.questionTextId ? request.body.questionTextId : oldMd?.questionTextId;
        md.contestId = request.body.contestId ? request.body.contestId : oldMd?.contestId;
        md.subjectId = request.body.subjectId ? request.body.subjectId : oldMd?.subjectId;
        md.subjectMatterId = request.body.subjectMatterId ? request.body.subjectMatterId : oldMd?.subjectMatterId;
        md.isCanceled = request.body.isCanceled ? request.body.isCanceled : oldMd?.isCanceled;
        md.solution = request.body.solution ? request.body.solution : oldMd?.solution;
        
        await QuestionDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Questão não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Questão atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        QuestionDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Questão não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Questão removida com sucesso!'
            });
        });
    }
}