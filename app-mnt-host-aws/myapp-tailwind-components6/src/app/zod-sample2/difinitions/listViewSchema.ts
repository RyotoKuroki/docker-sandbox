import { z } from "zod";

export const listViewRowSchema = z.object({
  field1: z.string(),
  field2: z.string(),
});
export type listViewRowType = z.infer<typeof listViewRowSchema>;

export const listViewSchema = z.object({
  rows: z.array(listViewRowSchema),
});
export type listViewType = z.infer<typeof listViewSchema>;
