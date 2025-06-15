"use server";

import { FormErrors, FormInput, FormSchema } from "../schemas";
import nodemailer from "nodemailer";
import {
    SendMailOptsAsMessageHtml,
    SendMailOptsAsMessageText
} from "./schemas-mail-options";

type ResultServ = {
    success: boolean,
    data?: any,
    error?: any,
}

const validateOnServer = async (
    formInput: FormInput
): Promise<ResultServ> => {

    const resultValidation = FormSchema.safeParse(formInput);
    if (!resultValidation.success) {
        return {
            success: false,
            //error: resultValidation.error,
            error: resultValidation.error.flatten().fieldErrors as FormErrors
        } as ResultServ;
    }

    return {
        success: true,
        data: resultValidation.data,
    } as ResultServ;
}


const sendMail = async () => {
/*
    const messageSample1: SendMailOptsAsMessageText = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        //to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        text: "本日は\r\nお日柄も\r\nよく！",
    };
    
    const resultMail = await transporter.sendMail({
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        //to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        text: "本日は\r\nお日柄も\r\nよく！",
    });
*/
    const mailOpts = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        //to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        text: "本日は\r\nお日柄も\r\nよく！",
    } as SendMailOptsAsMessageText;
    try {
        await sendMessageText(mailOpts);
    } catch (error) {
        console.error(`メール送信エラー opts= ${JSON.stringify(mailOpts)}:`, error);
        // エラーの詳細をログに出力（例: Nodemailerのエラーレスポンス）
        if ((error as any).responseCode) {
            console.error('SMTP レスポンスコード:', (error as any).responseCode);
            console.error('SMTP レスポンスメッセージ:', (error as any).response);
        }
        throw new Error('メールの送信に失敗しました。'); // 呼び出し元でエラーを処理できるよう再スロー
    }
    
}

const getTransport = () => {
    
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "maildev",
        port: Number(process.env.SMTP_PORT ?? "1025"),
        secure: false, // 開発環境のMailDevではSSL/TLSは通常無効
        ignoreTLS: true, // TLS接続を無視（MailDev用）
        // auth: { // MailDevは通常認証不要ですが、必要に応じて設定
        //     user: 'your_username',
        //     pass: 'your_password',
    });

}

const sendMessageText = async (
    messageSample1: SendMailOptsAsMessageText
) => {
    const transporter = getTransport();
    const resultMail = await transporter.sendMail(messageSample1);
}


export {
    validateOnServer,
    type ResultServ,

    sendMail,
}


