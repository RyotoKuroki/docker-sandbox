"use client";

import { useState } from "react";

// APIを呼び出してデータを表示するためのコンポーネント
export default function FetchTestPage() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ボタンクリックでAPIを呼び出すための非同期関数
  const handlePostRequest = async () => {
    // 入力値が空でないことを確認
    if (!name || age === "") {
      setError("Please enter both name and age.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // fetch APIを使用してPOSTリクエストを送信
      const apiResponse = await fetch("/api/fetch-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "api-key-sampe-gierogj340p",
        },
        // 入力値をJSON形式でボディに含める
        body: JSON.stringify({ name, age }),
      });

      // レスポンスが正常かどうかをチェック
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      // レスポンスをJSONとしてパース
      const data = await apiResponse.json();
      setResponse(data);
    } catch (err: any) {
      // エラーメッセージをセット
      setError(err.message || "Failed to fetch from API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Next.js API Route Test</h1>
      <p>Enter your name and age to send a POST request to the API.</p>

      {/* 入力フォーム */}
      <div style={{ marginBottom: "15px", marginTop: "15px" }}>
        <label htmlFor="name" style={{ marginRight: "10px" }}>
          Name:
        </label>
        <input
          className="border bg-blue-100 rounded-lg"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          style={{ padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="age" style={{ marginRight: "10px" }}>
          Age:
        </label>
        <input
          className="border bg-blue-100 rounded-lg"
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          disabled={loading}
          style={{ padding: "5px" }}
        />
      </div>

      {/* 送信ボタン */}
      <button
        onClick={handlePostRequest}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Sending..." : "Send POST Request"}
      </button>

      {/* ローディング、エラー、レスポンスの表示エリア */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {response && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
