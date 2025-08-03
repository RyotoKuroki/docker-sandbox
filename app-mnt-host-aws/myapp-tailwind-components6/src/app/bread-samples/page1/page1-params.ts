import { z } from "zod";

export const page1ParamsSchema = z.object({
  breadDisplayLabel: z.string(),
  pagePath: z.string(),

  value1Str: z.string(),
  value2Num: z.number(),
  value3Date: z.date(),
});

export type page1ParamsSchemaType = z.infer<typeof page1ParamsSchema>; // 型推論

// const jsonString = '{"id": 1, "name": "Alice", "email": "alice@example.com"}';

// try {
//   const userObject: User = UserSchema.parse(JSON.parse(jsonString));
//   console.log(userObject);
// } catch (error) {
//   console.error("バリデーションエラー:", error);
// }

// const objectToJson = JSON.stringify(userObject); // オブジェクトからJSON文字列へ
