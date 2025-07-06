import CredentialsProvider from "next-auth/providers/credentials";

import {NextAuthOptions} from "next-auth";



// ログイン処理の設定を記述

export const authOptions: NextAuthOptions = {

    // プロバイダ

    // ユーザの本人確認を責務とする

    providers: [

        // いわゆるID・パスワード方式

        // OAuthなども使えるが、今回はシンプルに扱えるクレデンシャル方式を採用

        CredentialsProvider({

            // ログインのタイミングで呼ばれる関数

            // ここで画面の入力情報が特定のユーザと紐づくか、つまり認証の成否を判定

            authorize(credentials, req) {

                console.log(`called authOptions - authorize`);

                // (後述)

                // credentialsオブジェクトのプロパティは、signIn()で渡された引数と対応

                if (!credentials?.username || !credentials?.password) {

                    console.log(`called authOptions - not found name/pass.`);
                    return null;

                }

                const {username, password} = credentials;


                // バックエンドなどと通信し、認証
                console.log(`called authOptions - access db.`);

                // ex:

                // await login(username, password);



                return {

                    id: "USERID",

                    name: username

                }

            },

            // 本来は、このオプションからログイン画面を組み立てるときに参照されるプロパティ

            // ただし、authorize関数の引数credentialsのキー名がここで定義したものに限定されるので、名前だけ設定しておく

            credentials: {username: {}, password: {}},

        })

    ],

    // トークンをハッシュ化させたりなど、機密情報を生成するのに使うランダムな文字列

    secret: process.env.AUTH_SECRET,

    // 特定のタイミングでNextAuth.jsから呼ばれる処理

    callbacks: {

        // JWTトークンを生成/更新する準備が整ったときに呼ばれる

        // トークンに何を含めるか

        async jwt({token, user}) {
            console.log(`called authOptions - jwt in callbacks.`);

            if (user?.name) {

                token.name = user.name

            }

            console.log(`token -> ${JSON.stringify(token)}`);
            return token;

        },

        // セッションがチェックされるたびに呼び出される
        async session({ session, token }) {
            console.log(`called authOptions - session in callbacks.`);

            // JWTトークンからセッションに情報を追加
            if (token.name) {
                //session.user.id = token.id as string;
                if (!session!.user) {
                    session.user = {};
                }
                session!.user!.name = token.name as string;
            }
            console.log(`session -> ${JSON.stringify(session)}`);
            return session;
        },
    }

}