/*
1.POSTリクエストが来たら処理を開始する
2./var/tmp/pid.log の最終更新日時から10秒以上経過していない場合、Httpステータス：429のエラーとする
3./var/tmp/pid.log に書き込まれている PIDと同じプロセスが実行中か確認し、実行中ならばHttpステータス：429のエラーとする
　※PIDは、後述の処理⑥で書き込む
4.10秒以上経過している場合、/var/tmp/pid.log の最終更新日時を更新する
5./usr/bin/javaProcess フォルダ内の startBatch.class をNextjsから実行する
6.実行時に取得した PIDを /var/tmp/pid.log に書き込む
7.実行した後は startBatchの標準出力を監視し、"NOTIFY_JAVABATCH_RAN_SAFETY" メッセージが含まれている場合は、APIからクライアントへ成功のレスポンスを返す
*/

"use server";

import { spawn } from "child_process";
import { utimesSync, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { checkIsEnoughTimeDistance } from "./partials/checkIsEnoughTimeDistance";
import { checkIsProcess } from "./partials/checkIsProcessing";

// --- 設定 ---
const NOTIFY_JAVABATCH_RAN_SAFETY = "NOTIFY_JAVABATCH_RAN_SAFETY";
const PID_FILE_PATH = "/var/tmp/pid.log";
const BATCH_DIR = "/usr/bin/javaProcess";
const BATCH_COMMAND = "startBatch.class";
const javaOptions = [`-Xms1024m`, `-Xmx1024m`];
const javaArgs = [NOTIFY_JAVABATCH_RAN_SAFETY];
export const COOLDOWN_SECONDS = 10;
// ---

// ANSIエスケープシーケンスの定義
export const STDOUT_COLORS = {
  RESET: "\x1b[0m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
};

/**
 * バッチ処理をトリガーするAPIルート
 * @returns 処理結果のJSONレスポンス
 */
export async function POST(request: NextRequest) {
  let batchResult: string = "";
  try {
    // 1.POSTリクエストが来たら処理を開始する
    console.log(`${STDOUT_COLORS.YELLOW}--- API called at ${new Date().toISOString()} ---${STDOUT_COLORS.RESET}`);

    // 2.最終更新日時から10秒以上経過していない場合、429エラー
    const resultEnoughTimeDIstance: {
      success: boolean;
      isEnough: boolean;
    } = await checkIsEnoughTimeDistance(PID_FILE_PATH, COOLDOWN_SECONDS);
    if (!resultEnoughTimeDIstance.success) {
      // faile
      const msg = "[checkTimeDIstance] Unhandled error.";
      console.error(`${STDOUT_COLORS.RED}${msg}${STDOUT_COLORS.RESET}`);
      return NextResponse.json({ error: msg }, { status: 500 });
    } else if (!resultEnoughTimeDIstance.isEnough) {
      // not enough
      const msg = "[checkTimeDIstance] Too many requests. Please wait.";
      console.error(`${STDOUT_COLORS.RED}${msg}${STDOUT_COLORS.RESET}`);
      return NextResponse.json({ error: msg }, { status: 429 });
    }

    // 3.PIDファイルからPIDを読み込み、プロセスが実行中か確認
    const resultAlreadyRunning: {
      success: boolean;
      isAlreadyRunning: boolean;
    } = await checkIsProcess(PID_FILE_PATH);
    if (!resultAlreadyRunning.success) {
      // faile
      const msg = "[checkAlreadyRunning] Unhandled error.";
      console.error(`${STDOUT_COLORS.RED}${msg}${STDOUT_COLORS.RESET}`);
      return NextResponse.json({ error: msg }, { status: 500 });
    } else if (!resultAlreadyRunning.isAlreadyRunning) {
      // already
      const msg = "[checkAlreadyRunning] Batch process is already running.";
      console.error(`${STDOUT_COLORS.RED}${msg}${STDOUT_COLORS.RESET}`);
      return NextResponse.json({ error: msg }, { status: 429 });
    }

    // 4.10秒以上経過している場合、PIDファイルの最終更新日時を更新
    utimesSync(PID_FILE_PATH, new Date(), new Date());

    // 5.Javaプログラムを実行
    const javaProcess = spawn("java", [...javaOptions, "-classpath", BATCH_DIR, BATCH_COMMAND, ...javaArgs]);
    const processId = javaProcess.pid;
    if (!processId) throw new Error(`PID was not created error.`);

    console.log(`Spawned Java process with PID: ${processId}`);

    // 6.取得したPIDをファイルに書き込む
    writeFileSync(PID_FILE_PATH, processId.toString(), "utf-8");

    // 7.実行したstartBatchの標準出力を監視
    batchResult = await new Promise<string>((resolve, reject) => {
      let output = "";

      // 標準出力からのデータをリッスン
      javaProcess.stdout.on("data", (data) => {
        output += data.toString();
        if (output.includes(NOTIFY_JAVABATCH_RAN_SAFETY)) {
          console.log(`${STDOUT_COLORS.GREEN}SUCCESS: Found magic string in Java output.${STDOUT_COLORS.RESET}`);
          resolve("success");
        }
      });

      // エラー出力をリッスン
      javaProcess.stderr.on("data", (data) => {
        console.error(`${STDOUT_COLORS.RED}Java Process Error:${STDOUT_COLORS.RESET}`, data.toString());
      });

      // プロセス終了を監視
      javaProcess.on("close", (code) => {
        if (code !== 0) {
          reject(`Java process exited with code: ${code}`);
        } else if (!output.includes(NOTIFY_JAVABATCH_RAN_SAFETY)) {
          reject("Magic string not found in Java process output.");
        }
      });

      // プロセスがエラーで終了した場合
      javaProcess.on("error", (err) => {
        reject(`Failed to start Java process: ${err.message}`);
      });
    });
  } catch (error: any) {
    console.error(`${STDOUT_COLORS.RED}Internal server error.${STDOUT_COLORS.RESET}`, error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  if (batchResult === "success") {
    console.error(`${STDOUT_COLORS.GREEN}Batch process executed successfully.${STDOUT_COLORS.RESET}`);
    return NextResponse.json({ message: "Batch process executed successfully." }, { status: 200 });
  } else {
    console.error(`${STDOUT_COLORS.RED}Batch process did not return success message.${STDOUT_COLORS.RESET}`);
    return NextResponse.json({ error: "Batch process did not return success message." }, { status: 500 });
  }
}
