import { z } from 'zod';

// schema of sub-email.
const inDtoSubsSchema = z.object({
    priority: z.coerce.number()
          .min(1, { message: '1以上で入力してください' })
          .max(100, { message: '100以下で入力してください' }),
    subEmail: z.string()
          .email({ message: '有効なメールアドレスを入力してください。' }),
});
// schema of this page form.
const inDtoSchema = z.object({
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
  subs: z.array(inDtoSubsSchema).min(1, {
      message: '少なくとも1つのアイテムを追加してください',
  }),
});
// generate zod-object -> type
type inDtoType = z.infer<typeof inDtoSchema>;
// generate zod-object -> type of errors
type inDtoErrorType = z.inferFlattenedErrors<typeof inDtoSchema>['fieldErrors'];


const outDtoSchema = z.object({
  msg: z.string(),
});
type outDtoType = z.infer<typeof inDtoSchema>;
type outDtoErrorType = z.inferFlattenedErrors<typeof inDtoSchema>['fieldErrors'];



export {
    inDtoSchema,
    type inDtoType,
    type inDtoErrorType,

    outDtoSchema,
    type outDtoType,
    type outDtoErrorType,
}
