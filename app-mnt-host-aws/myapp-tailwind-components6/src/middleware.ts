//import { NextResponse, NextRequest } from "next/server";
import { NextResponse, type NextRequest } from "next/server";
import { consoleDebug } from "./lib/debug/colorConsole";

const useCookieSample = false;
const useHeaderSample = false;

// このミドルウェア関数は、全てのリクエストに対して実行されます
export function middleware(request: NextRequest) {
  consoleDebug("RED", `[Middleware] Called.`);

  if (useCookieSample) {
    // Cookiesを利用するサンプル
    let cookie = request.cookies.get("nextjs");
    console.log(cookie); // {name:'nextjs',value:'fast',Path:'/'}

    request.cookies.has("nextjs"); //true
    request.cookies.delete("nextjs");
    request.cookies.has("nextjs"); //false

    const response = NextResponse.next();
    response.cookies.set("vercel", "fast");
    response.cookies.set({
      name: "vercel",
      value: "fast",
      path: "/",
    });
    cookie = response.cookies.get("vercel");
    console.log(cookie); //{name:'vercel',value:'fast',Path:'/'}
    return response;
  } else if (useHeaderSample) {
    // Headersを利用するサンプル
    const requestHeaders = new Headers(request.headers);
    //headerをコピーして、新しいheaderを設定
    requestHeaders.set("x-hello-from-middleware1", "hello");

    //NextResponseのrewriteを使用してheaderを書き換えることもできる
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set("x-hello-from-middleware2", "hello");
    return response;
  }

  // ユーザーが認証済みかどうかを判断するシンプルなロジック
  // ここでは、クッキーに認証トークンがあるかどうかをチェックします。
  const isAuthenticated = request.cookies.get("auth_token");

  // リクエストされたパスを取得
  const pathname = request.nextUrl.pathname;

  // もしパスが /dashboard で始まり、かつ認証されていない場合は...
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    // ユーザーをログインページにリダイレクトします
    // NextResponse.redirect() を使用して、リダイレクト先のURLを指定します。
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // それ以外の場合は、リクエストを続行させます
  // 何も返さないか、NextResponse.next() を明示的に返します
  return NextResponse.next();
}

// この設定は、ミドルウェアを実行するパスをフィルタリングします
// matcherを使用することで、全てのファイルに対して実行されるのを防ぎ、パフォーマンスを最適化します。
export const config = {
  // matcher: [
  //   //"/middleware-samples/:path*",
  //   "*",
  //   //"/dashboard/:path*", // /dashboard とその配下の全てのパスにマッチ
  //   //"/bread-samples/:path*",
  //   //"/api",
  //   //"/api-call-sample",
  // ],
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/"],
};
