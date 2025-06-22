// lib/prisma.ts

//import { PrismaClient } from '@prisma/client';
import { PrismaClient } from "@/generated/prisma";

// グローバルオブジェクトにPrismaClientインスタンスをキャッシュ
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// 開発環境でのホットリロード時に新しいPrismaClientインスタンスが作成されないようにする
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma as PrismaClient;
