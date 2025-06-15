"use server";

import {
    SendMailOptsAsMessageHtml,
    SendMailOptsAsMessageText
} from "../../../lib/mail-send-core/schemas-mail-options";
import { sendMessageHtml, sendMessageText } from "../../../lib/mail-send-core/action-sample";
import { readFileSyncAsUtf8, readSyncMailIdentifyAsUtf8 } from "../../../lib/mail-send-core/use-message-template-sample";


const sendMailAsMessageText = async () => {
    // text形式    
    const mailOptsAsText = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        //to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        text: "本日は\r\nお日柄も\r\nよく！",
    } as SendMailOptsAsMessageText;
    try {
        await sendMessageText(mailOptsAsText);
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
        //to: "hoge@somedomain.com",
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
        await sendMessageHtml(mailOptsAsHtml);
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

const sendMailFromTemplate = async () => {

    const mailTemplate = await readSyncMailIdentifyAsUtf8()
    // Html形式    
    const mailOptsAsHtml = {
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        //to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: mailTemplate.title,
        html: mailTemplate.bodyMessage,
    } as SendMailOptsAsMessageHtml;
    try {
        await sendMessageHtml(mailOptsAsHtml);
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

/**
 * メール送信
 */
const sendMail = async () => {

    await sendMailAsMessageText();

    await sendMailAsMessageHtml();

    await sendMailFromTemplate();

}

export {
    sendMail,
}


