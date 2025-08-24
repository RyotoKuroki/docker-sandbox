import { NextRequest, NextResponse } from "next/server";
import * as colorConsole from "@/lib/debug/colorConsole";

/**
 * @swagger
 * /api/fetch-test:
 * post:
 * summary: POSTリクエストのテストAPI
 * description: ボディから名前と年齢を取得し、それらを返すシンプルなAPIです。
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * description: ユーザーの名前
 * age:
 * type: number
 * description: ユーザーの年齢
 * responses:
 * 200:
 * description: 成功レスポンス
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: 'POST request received!'
 * data:
 * type: object
 * properties:
 * name:
 * type: string
 * age:
 * type: number
 * 400:
 * description: 無効なリクエストボディ
 */
// POSTリクエストを処理する関数
export async function POST(request: NextRequest) {
  colorConsole.consoleDebug("RED", `【api】fetch-test called.`);
  try {
    const apiKey = request.headers.get("X-API-KEY");

    console.log(`apikey[client]`, apiKey);
    console.log(`apikey[server]`, process.env.YOUR_API_KEY);
    if (apiKey !== process.env.YOUR_API_KEY) {
      return NextResponse.json({ error: "BAD API KEY." }, { status: 401 });
    }

    colorConsole.consoleDebug("GREEN", `【api】fetch-test api-key OK.`);

    // リクエストボディをJSONとしてパースする
    // bodyParser.json() といったミドルウェアは不要です
    const data = await request.json();

    // データのバリデーション（例：nameとageが存在するか）
    if (!data.name || data.age === undefined) {
      return NextResponse.json({ error: "Name and age are required in the request body." }, { status: 400 });
    }

    // コンソールに受信したデータをログ出力
    console.log("Received data:", data);

    // 成功した場合はJSONレスポンスを返す
    return NextResponse.json({
      message: "POST request received successfully!",
      data: {
        name: data.name,
        age: data.age,
        msg: "your call succeeded. wow!!",
      },
    });
  } catch (error) {
    // JSONパースエラーなど、予期せぬエラーが発生した場合
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 以下の関数を定義することで、他のHTTPメソッドのアクセスを明示的に拒否できます
// 例: GETリクエストを受け付けない場合

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "GET method not allowed for this endpoint. !!" }, { status: 405 });
}
