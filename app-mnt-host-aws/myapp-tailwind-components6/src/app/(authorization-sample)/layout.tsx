"use client";

import '../globals.css'; // グローバルCSS (Tailwind CSSなど)
import { SessionProvider } from 'next-auth/react'; // SessionProviderをインポート
//import type { Metadata } from 'next';
/*
export const metadata: Metadata = {
  title: 'auth-test',
  description: 'Authentication example with NextAuth.js',
};
*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // {/* SessionProvider でアプリケーションをラップ */}
  // {/* auth() から取得したセッションを渡すことで、サーバーコンポーネントでもセッションにアクセス可能になる */}
  return (
        <SessionProvider>
          {children}
        </SessionProvider>
  );
}
