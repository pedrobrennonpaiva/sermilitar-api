import { Request, Response } from "express";
import { User } from "../models/User";

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

import db from '../database/db';
const UserDb = db.User;

export class UserService {

    async get() {

        var users = await UserDb.find();

        return users;
    }

    async getById(id: string) {
        
        try
        {
            var user = await UserDb.findOne({ id });

            return user;
        }
        catch
        {
            return null;
        }
    }

    async getByName(name: string) {
        
        try
        {
            var users = await UserDb.find({"name" : name});

            return users;
        }
        catch
        {
            return null;
        }
    }

    async login(request: Request, response: Response) {

        var username = request.body.username;
        var password = request.body.password;

        var user = await UserDb.findOne({ username });

        if(!user)
        {
            user = await UserDb.findOne({ 'email' : username });
        }

        if (user && bcrypt.compareSync(password, user.password)) {

            var data = new Date();
            var tokenExpires = new Date(data.valueOf() - (data.getTimezoneOffset() * 60000));
            tokenExpires.setDate(tokenExpires.getDate() + 7);

            const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
            
            return response.json({
                ...user.toJSON(),
                token,
                tokenExpires
            });
        }
        
        response.status(500).json({message: 'Login inválido!'});
        // var userExist = await UserDb.findOne({ username, password });

        // if(userExist) {

        //     var user = JSON.parse(JSON.stringify(userExist)) as User;

        //     const token = jwt.sign({ user.id }, process.env.SECRET, {
        //         expiresIn: 604800 // expires in 7 days
        //     });

        //     return response.json({ auth: true, token: token });
        // }
          
    }

    async insert(request: Request, response: Response) {

        var user = new User();
        user.name = request.body.name;
        user.username = request.body.username;
        user.birthday = request.body.birthday;
        user.cpf = request.body.cpf;
        user.numberPhone = request.body.numberPhone;
        user.email = request.body.email;
        user.password = bcrypt.hashSync(request.body.password, 8);

        const db = new UserDb(user);
        
        db.save((err: any) => {
            if (err) {
                console.log(err);
                response.status(500).send({ 
                    success: false, 
                    message: 'Ocorreu um erro ao inserir o usuário!',
                    error: err
                });
            }
            else {
                response.status(201).send({ 
                    success: true, 
                    message: 'Usuário criado com sucesso!',
                    user
                });
            }
        });
    }

    async update(request: Request, response: Response) {

        var id = request.params.id;

        var oldUser = await UserDb.findOne({ id });
        
        var us = new User();
        us.id = oldUser?.id;
        us.registerDate = oldUser?.registerDate!;
        us.name = request.body.name ? request.body.name : oldUser?.name;
        us.username = request.body.username ? request.body.username : oldUser?.username;
        us.birthday = request.body.birthday ? request.body.birthday : oldUser?.birthday;
        us.cpf = request.body.cpf ? request.body.cpf : oldUser?.cpf;
        us.numberPhone = request.body.numberPhone ? request.body.numberPhone : oldUser?.numberPhone;
        us.email = request.body.email ? request.body.email : oldUser?.email;
        
        await UserDb.findOneAndUpdate({ id: request.params.id }, us, { new: true }, ((err: any, user: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Usuário não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Usuário atualizado com sucesso!',
                user
            });
        }));
    }

    async delete(request: Request, response: Response) {

        var id = request.params.id;
        
        UserDb.remove({ id }, (err: any) => {
            if(err)
            {
                response.status(500).send({ 
                    success: false, 
                    message: 'Usuário não encontrado!',
                    error: err
                });
            }

            response.status(200).send({ 
                success: true, 
                message: 'Usuário removido com sucesso!'
            });
        });
    }
}