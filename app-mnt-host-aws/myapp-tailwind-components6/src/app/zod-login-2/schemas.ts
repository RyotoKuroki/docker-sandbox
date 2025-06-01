

export const enum uiItemNames {
    name = "name",
    email = "email",
    nickname = "nickname",

    emailList = "subs",
    priority = "priority",
    subEmail = "subEmail",

    error = "error",

    cautionLine1 = "[氏名] と [メールアドレス] は",
    cautionLine2 = "必須項目です。",
}


export const newline = `\r\n`;
export const cautionName = `${uiItemNames.cautionLine1}${newline}${uiItemNames.cautionLine2}`;
