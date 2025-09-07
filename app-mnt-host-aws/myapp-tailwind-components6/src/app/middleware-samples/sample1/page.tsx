"use client";

import { consoleDebug } from "@/lib/debug/colorConsole";
import { useState } from "react";

// APIを呼び出してデータを表示するためのコンポーネント
export default function FetchTestPage() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  consoleDebug("GREEN", `[Middleware-sample-1] Called.`);
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Middleware-sample-1</h1>
    </div>
  );
}
