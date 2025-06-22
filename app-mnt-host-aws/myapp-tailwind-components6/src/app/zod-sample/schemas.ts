import { z } from 'zod';


// schema of sub-email.
const subEmailsSchema = z.object({
    priority: z.coerce.number()
          .min(1, { message: '1以上で入力してください' })
          .max(100, { message: '100以下で入力してください' }),
    subEmail: z.string()
          .email({ message: '有効なメールアドレスを入力してください。' }),
});
// schema of this page form.
const FormSchema = z.object({
  name: z.string()
          .nonempty({ message: '名前を入力してください！' })
          .min(2, { message: '2文字以上で入力してください。' }),
  email: z.string()
          .email({ message: '有効なメールアドレスを入力してください。' }),
  nickname: z.string()
          .max(10, { message: '10以下で入力してください' })
          .nullish(),
  validSide: z.string(),
  // age: z.number().min(18, { message: '18歳以上である必要があります。' }).optional(),
  subs: z.array(subEmailsSchema).min(1, {
      message: '少なくとも1つのアイテムを追加してください',
  }),
});
// generate zod-object -> type
type FormInput = z.infer<typeof FormSchema>;
// generate zod-object -> type of errors
type FormErrors = z.inferFlattenedErrors<typeof FormSchema>['fieldErrors'];


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
    type FormInput,
    type FormErrors,

    FormSchema,
    uiItemNames,
    newline,
    cautionName,
}