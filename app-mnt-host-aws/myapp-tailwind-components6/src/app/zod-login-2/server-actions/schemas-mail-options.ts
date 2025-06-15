type SendMailOptsAsMessageText = {
    from: string,
    to: string | string[],
    cc: string | string[],
    subject: string,
    text: string,
}
type SendMailOptsAsMessageHtml = {
    from: string,
    to: string | string[],
    cc: string | string[],
    subject: string,
    html: string,
}

export {
    type SendMailOptsAsMessageText,
    type SendMailOptsAsMessageHtml,
}