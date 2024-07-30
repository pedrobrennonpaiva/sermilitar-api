import { Request, Response } from "express";

const sgMail = require('@sendgrid/mail');

const SENDGRID = 'placeholder';

export default {

    async sendGridEmail(request: Request, response: Response) {

        sgMail.setApiKey(SENDGRID);

        const msg = {
            from: 'sermilitar.oficial@gmail.com',
            to: request.body.email,
            subject: request.body.subject,
            html: request.body.text,
          }
          
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent');
              response.send('Email sent');
            })
            .catch((error: any) => {
              console.error(error);
              response.status(400).send(error);
            });   
    },
}
