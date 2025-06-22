
const enum uiItemNames {
    name = "name",
    email = "email",
    nickname = "nickname",
    validSide = "validSide",

    emailList = "subs",
    priority = "priority",
    subEmail = "subEmail",

    error = "error",

    cautionLine1 = "[氏名] と [メールアドレス] は",
    cautionLine2 = "必須項目です。",
}

const newline = `\r\n`;
const cautionName = `${uiItemNames.cautionLine1}${newline}${uiItemNames.cautionLine2}`;

export {
    uiItemNames,
    newline,
    cautionName,
}