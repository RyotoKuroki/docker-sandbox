"use client";

import { useEffect, useMemo, useState /*, Suspense*/, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { delay } from "@/lib/promise/delay";

/**
 *
 * @returns
 */
export default function HomePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPending2, setIsPending] = useState(false);
  const [submitType, setSubmitType] = useState<"transition" | "custom" | undefined>(undefined);

  // 初期化処理
  useEffect(() => {
    startTransition(() => {});
  }, []);

  /** submit処理 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // ページリロードをキャンセル
    e.preventDefault();

    startTransition(async () => {
      await delay(3000);
      router.push("/redirect-sample/to");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">リダイレクト</h1>

        <form onSubmit={handleSubmit} className="space-y-6 flex flex-start justify-start">
          <div className="flex flex-col gap-3">
            tran:
            <button
              type="submit"
              onClick={() => {
                setSubmitType("transition");
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isPending ? "送信中..." : "送信"}
            </button>
            custom:
            <button
              type="submit"
              onClick={() => {
                setSubmitType("custom");
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isPending2 ? "送信中..." : "送信"}
            </button>
          </div>
        </form>
      </div>

      {/* ローディング */}
      {isPending && (
        <div className="fixed w-full h-full flex flex-center justify-center items-center">
          <div className="flex flex-col items-center space-y-4 border-green-500 bg-green-200 p-5 rounded-2xl">
            {/* 歯車のように回るスピナー */}
            <div className="animate-spin h-22 w-22 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            <p className="text-blue-500 text-lg" aria-label="processing...">
              processing...
            </p>
          </div>
        </div>
      )}

      {/* ローディング */}
      {isPending2 && (
        <div className="fixed w-full h-full flex flex-center justify-center items-center">
          <div className="flex flex-col items-center space-y-4 border-green-500 bg-green-200 p-5 rounded-2xl">
            {/* 歯車のように回るスピナー */}
            <div className="animate-spin h-22 w-22 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            <p className="text-blue-500 text-lg" aria-label="processing...">
              processing...
            </p>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Powered by Next.js, Tailwind CSS, and Zod.</p>
      </footer>
    </div>
  );
}
