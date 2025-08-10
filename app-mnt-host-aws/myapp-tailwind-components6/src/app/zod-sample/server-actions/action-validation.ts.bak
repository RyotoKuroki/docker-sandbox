"use server";

import { FormErrors, FormInput, FormSchema } from "../schemas";

type ResultServ = {
    success: boolean,
    data?: any,
    error?: any,
}

/**
 * 入力値チェック（サーバーサイド）
 * @param formInput 
 * @returns 
 */
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


export {
    validateOnServer,
    type ResultServ,
}


