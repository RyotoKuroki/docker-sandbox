"use server";

import { readFileSync } from "fs";
import { STDOUT_COLORS } from "../route";

export const checkIsProcess = async (
  pidFilePath: string,
): Promise<{
  success: boolean;
  isAlreadyRunning: boolean;
}> => {
  try {
    const pid = parseInt(readFileSync(pidFilePath, "utf-8"), 10);
    if (!isNaN(pid) && isProcessRunning(pid)) {
      console.warn(`${STDOUT_COLORS.RED}Batch process (PID: ${pid}) is already running.${STDOUT_COLORS.RESET}`);
      return {
        success: true,
        isAlreadyRunning: true,
      };
    }
  } catch (e) {
    return {
      success: false,
      isAlreadyRunning: false,
    };
  }
  return {
    success: true,
    isAlreadyRunning: false,
  };
};

const isProcessRunning = (pid: number): boolean => {
  try {
    // kill(0)はシグナルを送信せず、プロセスが存在するか確認する
    process.kill(pid, 0);
    return true;
  } catch (error: any) {
    // エラーコードが 'ESRCH'（プロセスが存在しない）でなければ、何らかのエラー
    return error.code === "EPERM";
  }
};
