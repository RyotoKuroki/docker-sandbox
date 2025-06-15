"use server";

import {
    SendMailOptsAsMessageHtml,
    SendMailOptsAsMessageText
} from "@/lib/mail-send-core/option-schemas";
import { sendMessage, } from "@/lib/mail-send-core/send-mail-core";
import { readSyncMailIdentifyAsUtf8 } from "@/lib/mail-send-core/use-templates/message-template-sample1";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendMailAsMessageText = async () => {
    // text形式
    const mailOptsAsText = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        text: "本日は\r\nお日柄も\r\nよく！",
    } as SendMailOptsAsMessageText;

    try {
        const resultMail = await sendMessage(mailOptsAsText) as SMTPTransport.SentMessageInfo;
        if (!resultMail.accepted)
            throw new Error(resultMail.messageId);

    } catch (error) {
        console.error(`メール送信エラー opts= ${JSON.stringify(mailOptsAsText)}:`, error);
        // エラーの詳細をログに出力（例: Nodemailerのエラーレスポンス）
        if ((error as any).responseCode) {
            console.error('SMTP レスポンスコード:', (error as any).responseCode);
            console.error('SMTP レスポンスメッセージ:', (error as any).response);
        }
        throw new Error('メールの送信に失敗しました。'); // 呼び出し元でエラーを処理できるよう再スロー
    }
}

const sendMailAsMessageHtml = async () => {
    // Html形式
    const mailOptsAsHtml = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        html: `
<div>
    <b>本日は</b>
</div>
<div>
    お日柄も
</div>
<div style="color: red; background: yellow;">
    よく！
</div>`,
    } as SendMailOptsAsMessageHtml;

    try {
        const resultMail = await sendMessage(mailOptsAsHtml) as SMTPTransport.SentMessageInfo;
        if (!resultMail.accepted)
            throw new Error(resultMail.messageId);
        
    } catch (error) {
        console.error(`メール送信エラー opts= ${JSON.stringify(mailOptsAsHtml)}:`, error);
        // エラーの詳細をログに出力（例: Nodemailerのエラーレスポンス）
        if ((error as any).responseCode) {
            console.error('SMTP レスポンスコード:', (error as any).responseCode);
            console.error('SMTP レスポンスメッセージ:', (error as any).response);
        }
        throw new Error('メールの送信に失敗しました。'); // 呼び出し元でエラーを処理できるよう再スロー
    }
}

const sendMailUseTemplate = async () => {

    const mailTemplateDirectory = "./src/app/assets/mails/message-templates";
    const mailTemplate = readSyncMailIdentifyAsUtf8(`${mailTemplateDirectory}/sample1`);

    // use template
    const mailOptsAsHtml = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: mailTemplate.title,
        html: mailTemplate.bodyMessage,
        attachments: mailTemplate.assets,
    } as SendMailOptsAsMessageHtml;

    try {
        const resultMail = await sendMessage(mailOptsAsHtml) as SMTPTransport.SentMessageInfo;
        if (!resultMail.accepted)
            throw new Error(resultMail.messageId);
        
    } catch (error) {
        console.error(`メール送信エラー opts= ${JSON.stringify(mailOptsAsHtml)}:`, error);
        // エラーの詳細をログに出力（例: Nodemailerのエラーレスポンス）
        if ((error as any).responseCode) {
            console.error('SMTP レスポンスコード:', (error as any).responseCode);
            console.error('SMTP レスポンスメッセージ:', (error as any).response);
        }
        throw new Error('メールの送信に失敗しました。');
    }
}

/**
 * メール送信
 */
const sendMail = async () => {

    // テキスト形式メッセージのサンプル
    await sendMailAsMessageText();

    // Html形式メッセージのサンプル
    await sendMailAsMessageHtml();

    // テンプレートファイルを利用したメッセージのサンプル
    await sendMailUseTemplate();
}

export {
    sendMail,
}


