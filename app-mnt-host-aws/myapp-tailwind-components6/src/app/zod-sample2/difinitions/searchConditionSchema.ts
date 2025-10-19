import { z } from "zod";

export const searchConditionSchema = z.object({
  field1: z.string().nonempty("必須だし！"),
  field2: z.string(),
});

export type searchConditionType = z.infer<typeof searchConditionSchema>;
export type searchConditionErrorType = z.inferFlattenedErrors<typeof searchConditionSchema>;
