"use server";

import { ApiResultCommon } from "@/lib/api/ApiResultCommon";
import {
  inDtoSaveSomeSchema,
  inDtoSaveSomeType,
  inDtoSaveSomeErrorType,
  outDtoSchema,
  outDtoType,
  outDtoErrorType,
} from "./action-save-somedata-schema";
import prisma from "@/lib/prisma";
import { createUUID } from "@/lib/uuid-lib";
import { format } from "date-fns";

/**
 * @param inDto
 * @returns
 */
export const saveSomedataAction = async (inDto: inDtoSaveSomeType): Promise<ApiResultCommon> => {
  console.log("### zod-sample backend called.");

  try {
    const resultValidation = inDtoSaveSomeSchema.safeParse(inDto);
    if (!resultValidation.success) {
      return {
        success: false,
        errorOnValidate: resultValidation.error.flatten().fieldErrors as inDtoSaveSomeErrorType,
      } as ApiResultCommon;
    }

    /*
        prisma.$transaction(async (prisma) => {

            // insert log
            console.log(`currentData: ${inDto.currentDate}`);
            await prisma.logging.create({
                data: {
                    id: createUUID(),
                    loged_at: inDto.currentDate,
                }
            });

            // delete old logs
            const logs = await prisma.logging.findMany({
                select: {
                    id: true,
                    loged_at: true,
                },
                orderBy: {
                    loged_at: "desc",
                }
            });

            // 保持するのは3件までとする
            const deleteLogs = logs.slice(3).map(entity => entity.id);
            if (deleteLogs.length > 0) {
                await prisma.logging.deleteMany({
                    where: {
                        id: { in: deleteLogs },
                    }
                })
            };
        });
        */

    console.log(`Success in serv.`);
    const result = {
      success: true,
      data: {
        msg: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      } as outDtoType,
    } as ApiResultCommon;

    return result;
  } catch (ex: any) {
    console.log(`Error in serv.`, ex.message);

    return {
      success: false,
      errorMsg: JSON.stringify(ex.message),
    } as ApiResultCommon;
  }
};
