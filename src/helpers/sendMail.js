import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export const sendMail = async (target, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMNTP_HOST,
        port: process.env.SMNTP_PORT,
        auth: {
            user: process.env.SMNTP_USER,
            pass: process.env.SMNTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: target,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Correo enviado: ' + info.response);
    });
}