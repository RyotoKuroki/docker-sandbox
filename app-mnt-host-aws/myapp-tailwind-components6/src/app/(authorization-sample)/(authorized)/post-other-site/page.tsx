"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";

const MyComponent = () => {
  //   const router = useRouter();
  //   const sess = useSession({
  //     required: true,
  //     onUnauthenticated: () => {
  //       router.push("/login");
  //     },
  //   });

  const handleSubmit = (event: any) => {
    //alert("test");
    //event.preventDefault(); // フォームのデフォルト送信を無効化
    // 必要であれば、ここでJavaScriptで追加の処理を行うことも可能
  };

  return (
    <form className="p-3" action="https://google.com/test" method="POST" target="_blank" onSubmit={handleSubmit}>
      p1：
      <input /*type="hidden"*/ name="data1" value="value1" className="w-[200px]" />
      <br />
      p2：
      <input /*type="hidden"*/ name="data2" value="value2" className="w-[200px]" />
      <br />
      <button type="submit" className="border p-3 m-3 rounded-lg">
        POSTで開く
      </button>
      <br />
    </form>
  );
};

export default MyComponent;
