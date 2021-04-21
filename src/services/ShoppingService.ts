import { Request, Response } from "express";
import { Shopping } from "../models/Shopping";
import db from '../database/db';

const ShoppingDb = db.Shopping;

export class ShoppingService {

    async get() {

        var models = await ShoppingDb.find();

        return models;
    }

    async getById(id: string) {
        
        try
        {
            var model = await ShoppingDb.findOne({ id });

            return model;
        }
        catch
        {
            return null;
        }
    }

    async insert(request: Request, response: Response) {

        var model = new Shopping();
        model.amountPaid = request.body.amountPaid;
        model.couponId = request.body.couponId;
        model.planId = request.body.planId;
        model.userId = request.body.userId;

        const db = new ShoppingDb(model);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir a compra!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Compra criada com sucesso!',
                    model
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldMd = await ShoppingDb.findOne({ id });
        
        var md = new Shopping();
        md.id = oldMd?.id;
        md.registerDate = oldMd?.registerDate!;
        md.amountPaid = request.body.amountPaid ? request.body.amountPaid : oldMd?.amountPaid;
        md.couponId = request.body.couponId ? request.body.couponId : oldMd?.couponId;
        md.planId = request.body.planId ? request.body.planId : oldMd?.planId;
        md.userId = request.body.userId ? request.body.userId : oldMd?.userId;
        
        await ShoppingDb.findOneAndUpdate({ id: request.params.id }, md, { new: true }, ((err: any, model: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Compra não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Compra atualizada com sucesso!',
                model
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        ShoppingDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Compra não encontrada!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Compra removida com sucesso!'
            });
        });
    }
}