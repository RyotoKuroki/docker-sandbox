"use client";

import {
  InputBlock,
  InputBlockNoBG,
  LabelBlock,
  LabelBlockNoBG,
  LabelInputBlock,
  LabelInputBlockArea,
  LabelInputBlockAreaNoBG,
  LabelInputBlockNoBG,
} from "@/app/components/LabelInputBlock";
import { useState } from "react";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";

// Zod スキーマの定義
const FormSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  // 必要に応じて他のフィールドを追加できます
  // age: z.number().min(18, { message: '18歳以上である必要があります。' }).optional(),
});

// Zod スキーマから TypeScript の型を生成
type FormInput = z.infer<typeof FormSchema>;

// エラーメッセージの型を定義（Zodのflatten()を利用する場合）
type FormErrors = z.inferFlattenedErrors<typeof FormSchema>["fieldErrors"];

export default function Home() {
  //const router = useRouter();
  // const sess = useSession({
  //   required: true,
  //   onUnauthenticated: () => {
  //     if (router) router.push("/login");
  //   },
  // });

  const [formData, setFormData] = useState<Partial<FormInput>>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [submittedData, setSubmittedData] = useState<FormInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //alert(`${name}, ${value}`)
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 入力中にエラーをクリアする（任意）
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmittedData(null);

    // 入力データのバリデーション
    const result = FormSchema.safeParse(formData);

    if (!result.success) {
      // バリデーションエラーがある場合
      const fieldErrors = result.error.flatten().fieldErrors as FormErrors;
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // バリデーション成功
    // ここでAPIへのデータ送信などの非同期処理を行うことができます
    // 例: await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted successfully:", result.data);
    setSubmittedData(result.data);
    // フォームをリセット（任意）
    // setFormData({ name: '', email: '' });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-center justify-center">
        {/*  spacer */}
        <div className="flex-col space-y-4 w-[95%] my-4">
          {/*  title */}
          <div className="flex flex-row-3">
            <h1>xxxxxxxxxxxxxxx</h1>
            <div>？</div>
          </div>

          {/*  body（別ファイル） */}
          <div className="flex-col space-y-7">
            {/*  section */}
            <div>
              <h3>単票形式サンプル１</h3>
              <LabelInputBlockArea>
                <LabelInputBlock className="h-[77px]">
                  <LabelBlock>ラベルるるるるr</LabelBlock>
                  <InputBlock className="flex flex-row space-x-3">
                    <div>
                      <label>
                        <input type="radio" /> aaaaaaa
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" /> bbbbbbbbbbb
                      </label>
                    </div>
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock className="h-[77px]">
                  <LabelBlock>ラベルるるるるr</LabelBlock>
                  <InputBlock>
                    <div className="flex flex-col items-center space-y-3 block flex-start justify-start">
                      <label className="block w-full">
                        <input type="radio" /> aaaaaaa
                      </label>
                      <label className="block w-full">
                        <input type="radio" /> bbbbbbbbbbb
                      </label>
                    </div>
                  </InputBlock>
                </LabelInputBlock>

                <LabelInputBlock className="h-[77px]">
                  <LabelBlock className="w-[300px]">
                    <label htmlFor="name">
                      <span className="text-red-500">*</span>なまえ
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-500">
                          {errors.name.join(", ")}
                        </p>
                      )}
                    </label>
                  </LabelBlock>
                  <InputBlock className="flex flex-col">
                    <input
                      id="name"
                      defaultValue={formData.name || ""}
                      onChange={handleChange}
                      className="w-full h-full border"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-500">
                        {errors.name.join(", ")}
                      </p>
                    )}
                    {/*
                    <div className=' h-full w-full'>
                      <input
                        id="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full h-full border" />
                    </div>
                    <div>
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-xs text-red-500">
                            {errors.name.join(', ')}
                          </p>
                        )}
                    </div>
*/}
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock className="h-[77px]">
                  <LabelBlock className="w-[300px]">
                    <label htmlFor="email">
                      <span className="text-red-500">*</span>E-mail
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-500">
                          {errors.email.join(", ")}
                        </p>
                      )}
                    </label>
                  </LabelBlock>
                  <InputBlock className="flex flex-col">
                    <input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="w-full h-[70%] border"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-500">
                        {errors.email.join(", ")}
                      </p>
                    )}
                    {/*
                    <div className=' h-full w-full'>
                      <input
                        id="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="w-full h-full border" />
                    </div>
                    <div>
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-xs text-red-500">
                            {errors.email.join(', ')}
                          </p>
                        )}
                    </div>
*/}
                  </InputBlock>
                </LabelInputBlock>
                <LabelInputBlock className="h-[160px]">
                  <LabelBlock className="w-[300px] items-start">ラベルるるるるrdsfawergewedfw</LabelBlock>
                  <InputBlock className="items-start">
                    <textarea className="w-full h-[70%] resize-none border"></textarea>
                  </InputBlock>
                </LabelInputBlock>
              </LabelInputBlockArea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {isSubmitting ? "送信中..." : "送信"}
              </button>
            </div>

            {/*  section */}
            <div>
              <h3>単票形式サンプル２</h3>
              <LabelInputBlockArea className="flex flex-row">
                {/* １列目 */}
                <div className="w-[40%]">
                  <LabelInputBlock className="h-[55px]">
                    <LabelBlock>ラベル１</LabelBlock>
                    <InputBlock className="border-r">
                      <input className="w-full h-full border" />
                    </InputBlock>
                  </LabelInputBlock>
                  <LabelInputBlock className="h-[55px]">
                    <LabelBlock className="w-[100px]">ラベル２</LabelBlock>
                    <InputBlock className="border-r">
                      <input className="w-full h-full border" />
                    </InputBlock>
                  </LabelInputBlock>
                  <LabelInputBlock className="h-[55px]">
                    <LabelBlock className="w-[100px] items-end">下詰め</LabelBlock>
                    <InputBlock className="border-r">
                      <input className="w-full h-full border" />
                    </InputBlock>
                  </LabelInputBlock>
                </div>
                {/* ２列目 */}
                <div className="w-[40%]">
                  <LabelInputBlock className="h-[55px]">
                    <LabelBlock className="">ラベルるるるるr</LabelBlock>
                    <InputBlock className="border-r">
                      <input className="w-full h-full border" />
                    </InputBlock>
                  </LabelInputBlock>
                  <LabelInputBlock className="h-[55px]">
                    <LabelBlock>ラベルるるるるr</LabelBlock>
                    <InputBlock className="border-r">
                      <input className="w-full h-full border" />
                    </InputBlock>
                  </LabelInputBlock>
                  <LabelInputBlock className="h-[55px]">
                    <LabelBlock className="items-start">上詰め</LabelBlock>
                    <InputBlock className="border-r">
                      <input className="w-full h-full border" />
                    </InputBlock>
                  </LabelInputBlock>
                </div>
                {/* ２列目 */}
                <div className="flex-1 p-1">
                  <img className="border w-full h-full" alt="hoge"></img>
                </div>
              </LabelInputBlockArea>
            </div>

            {/*  section */}
            <div>
              <h3>単票形式サンプル３</h3>
              <LabelInputBlockAreaNoBG>
                <LabelInputBlockNoBG className="h-[55px]">
                  <LabelBlockNoBG className="">ラベルるるるるr</LabelBlockNoBG>
                  <InputBlockNoBG className="">
                    <input className="border w-[400px] h-full" />
                  </InputBlockNoBG>
                </LabelInputBlockNoBG>
                <LabelInputBlockNoBG className="h-[55px]">
                  <LabelBlockNoBG className="">* ラベルるるるるr</LabelBlockNoBG>
                  <InputBlockNoBG className="">
                    <input value={123} className="border w-[400px] h-full" />
                  </InputBlockNoBG>
                </LabelInputBlockNoBG>
              </LabelInputBlockAreaNoBG>
            </div>

            {/*  section */}
            <div className="bg-yellow-300">cccccccccccccccccccccccccccccccccc</div>
          </div>
        </div>
      </div>
    </form>
  );
}
