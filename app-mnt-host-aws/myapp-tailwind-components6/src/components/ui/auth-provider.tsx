// components/auth-provider.tsx
'use client'; // このコンポーネントがクライアントコンポーネントであることを明示

import { SessionProvider } from 'next-auth/react';
import React from 'react';

/**
 * NextAuth の SessionProvider をラップするクライアントコンポーネント。
 * layout.tsx (サーバーコンポーネント) から呼び出すことで、
 * Hydration エラーを回避し、子孫のクライアントコンポーネントにセッションコンテキストを提供します。
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
