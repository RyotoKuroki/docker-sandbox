import { z } from 'zod';

const inDtoSchema = z.object({
  currentDate: z.string(),
});
type inDtoType = z.infer<typeof inDtoSchema>;
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
