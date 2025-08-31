"use server";

import { statSync } from "fs";
import { STDOUT_COLORS } from "../route";

export const checkIsEnoughTimeDistance = async (
  pidFilePath: string,
  timeDistance: number,
): Promise<{
  success: boolean;
  isEnough: boolean;
}> => {
  try {
    const stats = statSync(pidFilePath);
    const lastModifiedTime = stats.mtime.getTime();
    const currentTime = Date.now();
    const timeElapsed = (currentTime - lastModifiedTime) / 1000;

    if (timeElapsed < timeDistance) {
      console.warn(
        `${STDOUT_COLORS.RED}API is on cooldown. Time elapsed: ${timeElapsed.toFixed(2)}s${STDOUT_COLORS.RESET}`,
      );
      return {
        success: true,
        isEnough: false,
      };
    }
  } catch (e) {
    return {
      success: false,
      isEnough: false,
    };
  }
  return {
    success: true,
    isEnough: true,
  };
};
