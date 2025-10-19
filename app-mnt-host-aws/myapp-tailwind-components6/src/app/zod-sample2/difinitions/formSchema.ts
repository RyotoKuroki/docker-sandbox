import { z } from "zod";
import { searchConditionSchema } from "./searchConditionSchema";
import { listViewRowSchema, listViewSchema } from "./listViewSchema";

export const formSchema = z.object({
  /** 検索条件１ */
  searchCondition1: searchConditionSchema,
  /** 検索条件２ */
  searchCondition2: searchConditionSchema,
  /** 一覧リスト */
  rows: z.array(listViewRowSchema),
});
export type formType = z.infer<typeof formSchema>;
export type formTypeError = z.inferFormattedError<typeof formSchema>;
