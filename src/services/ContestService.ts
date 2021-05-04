import { Request, Response } from "express";
import { Contest } from "../models/Contest";
import db from '../database/db';

const ContestDb = db.Contest;
const ArmedForceDb = db.ArmedForce;
const PatentDb = db.Patent;
const ScholarityDb = db.Scholarity;
const ExaminingBoardDb = db.ExaminingBoard;
const InstitutionDb = db.Institution;

export class ContestService {

    async get() {

        var models = await ContestDb.find().lean();

        for(var model of models)
        {
            model.armedForce = await ArmedForceDb.findOne({ id: model?.armedForceId });
            model.patent = await PatentDb.findOne({ id: model?.patentId });
            model.scholarity = await ScholarityDb.findOne({ id: model?.scholarityId });
            model.examiningBoard = await ExaminingBoardDb.findOne({ id: model?.examiningBoardId });
            model.institution = await InstitutionDb.findOne({ id: model?.institutionId });
        }

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await ContestDb.findOne({ id }).lean();
            model!.armedForce = await ArmedForceDb.findOne({ id: model?.armedForceId });
            model!.patent = await PatentDb.findOne({ id: model?.patentId });
            model!.scholarity = await ScholarityDb.findOne({ id: model?.scholarityId });
            model!.examiningBoard = await ExaminingBoardDb.findOne({ id: model?.examiningBoardId });
            model!.institution = await InstitutionDb.findOne({ id: model?.institutionId });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Contest();
        model.name = request.body.name;
        model.year = request.body.year;
        model.armedForceId = request.body.armedForceId;
        model.patentId = request.body.patentId;
        model.salary = request.body.salary;
        model.questionsLength = request.body.questionsLength;
        model.questionDescription = request.body.questionDescription;
        model.registration = request.body.registration;
        model.testDate = request.body.testDate;
        model.vacancies = request.body.vacancies;
        model.vacanciesDescription = request.body.vacanciesDescription;
        model.requirements = request.body.requirements;
        model.scholarityId = request.body.scholarityId;
        model.areas = request.body.areas;
        model.locations = request.body.locations;
        model.duration = request.body.duration;
        model.site = request.body.site;
        model.examiningBoardId = request.body.examiningBoardId;
        model.institutionId = request.body.institutionId;

        var armedForce = await ArmedForceDb.findOne({ id: model.armedForceId });
        var patent = await PatentDb.findOne({ id: model.patentId });
        var scholarity = await ScholarityDb.findOne({ id: model.scholarityId });
        var examiningBoard = await ExaminingBoardDb.findOne({ id: model.examiningBoardId });
        var institution = await InstitutionDb.findOne({ id: model.institutionId });

        if(!armedForce || !patent || !scholarity || !examiningBoard || !institution)
        {
            response.status(500).send({ 
                success: false, 
                message: `
                    ${!armedForce ? 'Força armada não existe! ' : ''}
                    ${!patent ? 'Patente não existe! ' : ''}
                    ${!scholarity ? 'Escolaridade não existe!' : ''}
                    ${!examiningBoard ? 'Banca não existe!' : ''}
                    ${!institution ? 'Instituição não existe!' : ''}
                `
            });
            return;
        }

        const db = new ContestDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a concurso!',
                    error: err
                });
            }
            else {
                model.armedForce = armedForce;
                model.patent = patent;
                model.scholarity = scholarity;
                model.examiningBoard = examiningBoard;
                model.institution = institution;

                response.status(201).send({ 
                    success: true, 
                    message: 'Concurso criado com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await ContestDb.findOne({ id });
        
        var md = new Contest();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        md.year = request.body.year ? request.body.year : oldMd?.year;
        md.armedForceId = request.body.armedForceId ? request.body.armedForceId : oldMd?.armedForceId;
        md.patentId = request.body.patentId ? request.body.patentId : oldMd?.patentId;
        md.scholarityId = request.body.scholarityId ? request.body.scholarityId : oldMd?.scholarityId;
        md.examiningBoardId = request.body.examiningBoardId ? request.body.examiningBoardId : oldMd?.examiningBoardId;
        md.institutionId = request.body.institutionId ? request.body.institutionId : oldMd?.institutionId;
        md.salary = request.body.salary;
        md.questionsLength = request.body.questionsLength;
        md.questionDescription = request.body.questionDescription;
        md.registration = request.body.registration;
        md.testDate = request.body.testDate;
        md.vacancies = request.body.vacancies;
        md.vacanciesDescription = request.body.vacanciesDescription;
        md.requirements = request.body.requirements;
        md.areas = request.body.areas;
        md.locations = request.body.locations;
        md.duration = request.body.duration;
        md.site = request.body.site;
        
        var armedForce = await ArmedForceDb.findOne({ id: md.armedForceId });
        var patent = await PatentDb.findOne({ id: md.patentId });
        var scholarity = await ScholarityDb.findOne({ id: md.scholarityId });
        var examiningBoard = await ExaminingBoardDb.findOne({ id: md.examiningBoardId });
        var institution = await InstitutionDb.findOne({ id: md.institutionId });

        if(!armedForce || !patent || !scholarity || !examiningBoard || !institution)
        {
            response.status(500).send({ 
                success: false, 
                message: `
                    ${!armedForce ? 'Força armada não existe! ' : ''}
                    ${!patent ? 'Patente não existe! ' : ''}
                    ${!scholarity ? 'Escolaridade não existe!' : ''}
                    ${!examiningBoard ? 'Banca não existe!' : ''}
                    ${!institution ? 'Instituição não existe!' : ''}
                `
            });
            return;
        }

        await ContestDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Concurso não encontrado!',
                    error: err
                });
            }
            else {
                model.armedForce = armedForce;
                model.patent = patent;
                model.scholarity = scholarity;
                model.examiningBoard = examiningBoard;
                model.institution = institution;

                response.status(200).send({ 
                    success: true, 
                    message: 'Concurso atualizado com sucesso!',
                    model
                });
            }
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        ContestDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Concurso não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Concurso removido com sucesso!'
            });
        });
    }
}