import { z, ZodString } from "zod";

// schema of this page form.
export const sampleValidateSchema = z.object({
  value1: z.string().nonempty("ひっすよ").max(3, "最大３桁ですよ"),
  value2: z.coerce.number().nullish(),
  value3: z.string().nonempty("必須っす(3)").max(10, "入力値≦10桁"),
  value4: z
    .string()
    .nonempty("必須っす(4)")
    .refine((ctx: string) => {
      if (!ctx) return false;
      return ctx != "2";
    }, "選択しは１のみやで"),
});

export type sampleValidateType = z.infer<typeof sampleValidateSchema>;
export type sampleValidateErrorType = z.inferFlattenedErrors<typeof sampleValidateSchema>; //;["fieldErrors"];
