"use server";

import { ApiResultCommon } from "@/lib/api/ApiResultCommon";
import {
    inDtoSchema,
    inDtoType,
    inDtoErrorType,

    outDtoSchema,
    outDtoType,
    outDtoErrorType,
} from "./action-initialize-schema";
import prisma from "@/lib/prisma";
import { createUUID } from "@/lib/uuid-lib";

/**
 * @param inDto 
 * @returns 
 */
export const initializeAction = async (
    inDto: inDtoType
): Promise<ApiResultCommon> => {

    const resultValidation = inDtoSchema.safeParse(inDto);
    if (!resultValidation.success) {
        return {
            success: false,
            errorMsg: resultValidation.error.flatten().fieldErrors as any
        } as ApiResultCommon;
    }

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
            /*
            where: {},
            */
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

    const result = {
        success: true,
        data: {
            currentDate: inDto.currentDate,
        } as outDtoType,
    } as ApiResultCommon;

    return result;
}
