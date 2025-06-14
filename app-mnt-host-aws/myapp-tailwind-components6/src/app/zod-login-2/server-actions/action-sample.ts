"use server";

import { FormErrors, FormInput, FormSchema } from "../schemas";
import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
        host: "maildev",
        port: 1025,
        //auth: {
        //    user: process.env.GMAILUSER,
        //    pass: process.env.GMAILPASSWORD,
        //},
        ignoreTLS:true,
        secure: false, // true for 465, false for other ports
    });
    
    const resultMail = await transporter.sendMail({
        from: '"R.K" <rk@somedomain.com>',
        to: "hoge@somedomain.com",
        //to: "hoge@somedomain.com",
        cc: ["aaa@somedomain.com", "bbb@somedomain.com", "ccc@somedomain.com"],
        subject: "done!",
        text: "本日は\r\nお日柄も\r\nよく！",
    });

}


export {
    validateOnServer,
    type ResultServ,

    sendMail,
}


