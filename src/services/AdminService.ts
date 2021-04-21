import { Request, Response } from "express";
import { Admin } from "../models/Admin";

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

import db from '../database/db';
const AdminDb = db.Admin;

export class AdminService {

    async get() {

        var admins = await AdminDb.find();

        return admins;
    }

    async getById(id: string) {
        
        try
        {
            var admin = await AdminDb.findOne({ id });

            return admin;
        }
        catch
        {
            return null;
        }
    }

    async getByName(name: string) {
        
        try
        {
            var admins = await AdminDb.find({"name" : name});

            return admins;
        }
        catch
        {
            return null;
        }
    }

    async login(request: Request, response: Response) {

        var username = request.body.username;
        var password = request.body.password;

        var admin = await AdminDb.findOne({ username });

        if(!admin)
        {
            admin = await AdminDb.findOne({ 'email' : username });
        }

        if (admin && bcrypt.compareSync(password, admin.password)) {

            var data = new Date();
            var tokenExpires = new Date(data.valueOf() - (data.getTimezoneOffset() * 60000));
            tokenExpires.setDate(tokenExpires.getDate() + 7);

            const token = jwt.sign({ sub: admin.id }, process.env.SECRET, { expiresIn: '7d' });
            
            return response.json({
                ...admin.toJSON(),
                token,
                tokenExpires
            });
        }
        
        response.status(500).json({message: 'Login inválido!'});
          
    }

    async insert(request: Request, response: Response) {

        var admin = new Admin();
        admin.name = request.body.name;
        admin.username = request.body.username;
        admin.birthday = request.body.birthday;
        admin.numberPhone = request.body.numberPhone;
        admin.email = request.body.email;
        admin.password = bcrypt.hashSync(request.body.password, 8);

        const db = new AdminDb(admin);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir o admin!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Admin criado com sucesso!',
                    admin
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldAdmin = await AdminDb.findOne({ id });
        
        var us = new Admin();
        us.id = oldAdmin?.id;
        us.registerDate = oldAdmin?.registerDate!;
        us.name = request.body.name ? request.body.name : oldAdmin?.name;
        us.username = request.body.username ? request.body.username : oldAdmin?.username;
        us.birthday = request.body.birthday ? request.body.birthday : oldAdmin?.birthday;
        us.numberPhone = request.body.numberPhone ? request.body.numberPhone : oldAdmin?.numberPhone;
        us.email = request.body.email ? request.body.email : oldAdmin?.email;
        
        await AdminDb.findOneAndUpdate({ id: request.params.id }, us, { new: true }, ((err: any, admin: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Admin não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Admin atualizado com sucesso!',
                admin
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        AdminDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Admin não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Admin removido com sucesso!'
            });
        });
    }
}