"use server";

import nodemailer from "nodemailer";
import { SendMailOptsAsMessageHtml, SendMailOptsAsMessageText } from "./option-schemas";

const getTransport = () => {
    
    return nodemailer.createTransport({
        //host: process.env.SMTP_HOST ?? "maildev",
        //port: Number(process.env.SMTP_PORT ?? "1025"),
        host: "localhost",
        port: 1025,
        secure: false, // 開発環境のMailDevではSSL/TLSは通常無効
        ignoreTLS: true, // TLS接続を無視（MailDev用）
    });

}

/**
 * メッセージがテキスト形式のサンプル
 * @param messageSample1 
 */
const sendMessage = async (
    messageSample1: SendMailOptsAsMessageText | SendMailOptsAsMessageHtml
) => {
    const transporter = getTransport();
    return await transporter.sendMail(messageSample1);
}

export {
    sendMessage,
}
