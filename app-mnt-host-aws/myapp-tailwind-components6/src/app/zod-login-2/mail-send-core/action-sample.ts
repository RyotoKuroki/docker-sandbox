"use server";

import nodemailer from "nodemailer";
import {
    SendMailOptsAsMessageHtml,
    SendMailOptsAsMessageText
} from "./schemas-mail-options";

const getTransport = () => {
    
    return nodemailer.createTransport({
        //host: process.env.SMTP_HOST ?? "maildev",
        //port: Number(process.env.SMTP_PORT ?? "1025"),
        host: "localhost",
        port: 1025,
        secure: false, // 開発環境のMailDevではSSL/TLSは通常無効
        ignoreTLS: true, // TLS接続を無視（MailDev用）
        // auth: { // MailDevは通常認証不要ですが、必要に応じて設定
        //     user: 'your_username',
        //     pass: 'your_password',
    });

}

/**
 * メッセージがテキスト形式のサンプル
 * @param messageSample1 
 */
const sendMessageText = async (
    messageSample1: SendMailOptsAsMessageText
) => {
    const transporter = getTransport();
    return await transporter.sendMail(messageSample1);
}

/**
 * メッセージがHTML形式のサンプル
 * @param messageSample1 
 */
const sendMessageHtml = async (
    messageSample1: SendMailOptsAsMessageHtml
) => {
    const transporter = getTransport();
    return await transporter.sendMail(messageSample1);
}

export {
    sendMessageText,
    sendMessageHtml,
}


