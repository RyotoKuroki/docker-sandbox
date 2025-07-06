import NextAuth from "next-auth";

import {authOptions} from "@/lib/authOptions";



// サーバ側でログイン処理を実行するためのエンドポイント

const handler = NextAuth(authOptions);



export {handler as GET, handler as POST};