"use client";

import { signIn } from "next-auth/react";
import * as dateUtils from "@/lib/date-utils/date-utils";

// ログイン画面 ボタンを押したらログイン成功画面へ遷移

export default function SignInPage() {
  const handleSignIn = () => {
    // 第一引数は認証プロバイダ名 プロバイダによってリダイレクトなどの制御が異なるので指定が必要

    signIn("credentials", {
      // ログイン処理後のリダイレクト先

      //callbackUrl: '/welcome',
      callbackUrl: "/zod-sample?p1=ppprm",

      // 以降はクレデンシャル情報

      username: "Snivy",

      password: "strongPassword",
    });
  };

  const dt = new Date();
  console.log(JSON.stringify(dt));

  const dateEssence = dateUtils.getDateEssence(new Date());
  console.log(JSON.stringify(dateEssence));

  // 現在日時：例）2025(令和)7年7月27日 - 10時55分23秒118㍉秒
  const currentDateTime = `${dateEssence!.year.asGregorian}(${dateEssence!.era})${dateEssence!.year.asEra}年${
    dateEssence!.month.asHuman
  }月${dateEssence!.day}日 - ${dateEssence!.hour}時${dateEssence!.minute}分${dateEssence!.second}秒${
    dateEssence!.msecond
  }㍉秒`;

  return (
    <div className="p-3">
      <div>現在時刻：{currentDateTime}</div>
      <div>
        ID:
        <input type="text" className={`mt-1 block w-[200px] px-3 py-2 border`} />
      </div>
      <div>
        PS:
        <input className={`mt-1 block w-[200px] px-3 py-2 border`} type="password" />
      </div>
      <button onClick={handleSignIn} className="border rounded p-3 m-3">
        ログイン
      </button>
    </div>
  );
}
