import Mail, { Attachment } from "nodemailer/lib/mailer"

type SendMailOptsAsMessageText = Mail.Options & {
    from: string,
    to: string | string[],
    cc: string | string[],
    subject: string,
    text: string,
    attachments?: Attachment[] | undefined;
}
type SendMailOptsAsMessageHtml = Mail.Options & {
    from: string,
    to: string | string[],
    cc: string | string[],
    subject: string,
    html: string,
    attachments?: Attachment[] | undefined;
}

export {
    type SendMailOptsAsMessageText,
    type SendMailOptsAsMessageHtml,
}