'use client'

import {signIn} from "next-auth/react";



// ログイン画面 ボタンを押したらログイン成功画面へ遷移

export default function SignInPage() {



    const handleSignIn = () => {

        // 第一引数は認証プロバイダ名 プロバイダによってリダイレクトなどの制御が異なるので指定が必要

        signIn('credentials', {

            // ログイン処理後のリダイレクト先

            //callbackUrl: '/welcome',
            callbackUrl: '/zod-authorized',

            // 以降はクレデンシャル情報

            username: 'Snivy',

            password: 'strongPassword',

        });

    };



    return (

        <div>

            <button onClick={handleSignIn} className="border rounded p-3 m-3">

                ログイン

            </button>

        </div>

    );

}