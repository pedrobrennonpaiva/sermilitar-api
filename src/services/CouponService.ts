import { Request, Response } from "express";
import { Coupon } from "../models/Coupon";
import db from '../database/db';

const CouponDb = db.Coupon;

export class CouponService {

    async get() {

        var models = await CouponDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await CouponDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Coupon();
        model.name = request.body.name;
        model.code = request.body.code;
        model.isActive = request.body.isActive;

        const db = new CouponDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a patente!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Coupone criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await CouponDb.findOne({ id });
        
        var md = new Coupon();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.name = request.body.name ? request.body.name : oldMd?.name;
        md.code = request.body.code ? request.body.code : oldMd?.code;
        md.isActive = request.body.isActive ? request.body.isActive : oldMd?.isActive;
        
        await CouponDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Coupone não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Coupone atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        CouponDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Coupone não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Coupone removida com sucesso!'
            });
        });
    }
}