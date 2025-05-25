// app/page.tsx
'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

// schema of sub-email.
const subEmailsSchema = z.object({
    priority: z.coerce.number()
          .min(1, { message: '1以上で入力してください' })
          .max(100, { message: '100以下で入力してください' }),
    subEmail: z.string()
          .email({ message: '有効なメールアドレスを入力してください。' }),
});
// schema of this page form.
const FormSchema = z.object({
  name: z.string()
          .nonempty({ message: '名前を入力してください！' })
          .min(2, { message: '2文字以上で入力してください。' }),
  email: z.string()
          .email({ message: '有効なメールアドレスを入力してください。' }),
  // age: z.number().min(18, { message: '18歳以上である必要があります。' }).optional(),
  subs: z.array(subEmailsSchema).min(1, {
      message: '少なくとも1つのアイテムを追加してください',
  }),
});
// generate zod-object -> type
type FormInput = z.infer<typeof FormSchema>;
// generate zod-object -> type of errors
type FormErrors = z.inferFlattenedErrors<typeof FormSchema>['fieldErrors'];



export default function HomePage() {

  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [submittedData, setSubmittedData] = useState<FormInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormInput>({
    resolver: standardSchemaResolver(FormSchema),
    defaultValues: {
      name: "xxx",
      email: "hoge@somedomain.com",
      subs: [
        { priority: 1, subEmail: "sub1@somedomain.com" },
        { priority: 2, subEmail: "sub2@somedomain.com" },
        { priority: 3, subEmail: "sub3@somedomain.com" },
      ]
    },
    mode: 'onBlur', // フォーカスが外れたときにバリデーションを実行
  });
  // useFieldArray を使用して、アイテムの配列を管理
  const { fields, append, remove } = useFieldArray({
      control: methods.control,
      name: 'subs',
  });


  /** submit処理 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    // ページリロードをキャンセル
    e.preventDefault();
    
    // フォームデータ取得
    const formData = methods.getValues();

    setIsSubmitting(true);
    setErrors({});
    setSubmittedData(null);

    // 入力データのバリデーション
    const result = FormSchema.safeParse(formData);
    //alert(JSON.stringify(result, null, 4))

    if (!result.success) {
      // バリデーションエラーがある場合
      const fieldErrors = result.error.flatten().fieldErrors as FormErrors;
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return false;
    }

    // DB更新処理
    setTimeout(() => {
      // バリデーション成功
      // ここでAPIへのデータ送信などの非同期処理を行うことができます
      // 例: await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted successfully:', result.data);
      setSubmittedData(result.data);
      // フォームをリセット（任意）
      // setFormData({ name: '', email: '' });
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          お問い合わせフォーム;
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor={methods.register("name").name}
            >
              お名前
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              aria-describedby="name-error"
              {...methods.register("name")}
              id={methods.register("name").name}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-500">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor={methods.register("email").name}
            >
              メールアドレス
            </label>
            <input
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              aria-describedby="email-error"
              {...methods.register("email")}
              id={methods.register("email").name}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500">
                {errors.email.join(', ')}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1">
              Subメールアドレス
            </label>
            {fields.map((sub, index) => (
              <div className='flex flex-row justify-start items-start gap-2'>
                <div className='w-[30%] items-start'>
                  <input
                    type="number"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      (methods.formState.errors.subs?.[index]?.priority) ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-describedby={`subs-${index}-priority-error`}
                    {...methods.register(`subs.${index}.priority`)}
                    id={`subs.${index}.priority`}
                    placeholder='優先度'
                  />
                  {methods.formState.errors.subs?.[index]?.priority && (
                    <p id={`subs-${index}-priority-error`} className="mt-1 text-xs text-red-500">
                      {methods.formState.errors.subs[index]?.priority?.message}
                    </p>
                  )}
                </div>
                <div className='flex-1 items-start'>
                  <input
                    type="email"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      (methods.formState.errors.subs?.[index]?.subEmail) ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-describedby={`subs-${index}-subEmail-error`}
                    {...methods.register(`subs.${index}.subEmail`)}
                    id={`subs.${index}.subEmail`}
                    placeholder='sub-email'
                  />
                  {methods.formState.errors.subs?.[index]?.subEmail && (
                    <p id={`subs-${index}-subEmail-error`} className="mt-1 text-xs text-red-500">
                      {methods.formState.errors.subs[index]?.subEmail?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isSubmitting ? '送信中...' : '送信'}
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <h2 className="text-lg font-semibold">送信成功！</h2>
            <p className="mt-2">以下の内容で送信されました：</p>
            <pre className="mt-2 p-2 bg-gray-50 rounded text-sm overflow-x-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* ローディング */}
      {isSubmitting && (
        <div className="fixed w-full h-full flex flex-center justify-center items-center">
{/*
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
          </div>
*/}
          <div className="flex flex-col items-center space-y-4 border-green-500 bg-green-200 p-5 rounded-2xl">
            {/* 歯車のように回るスピナー */}
            <div className="animate-spin h-22 w-22 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            <p className="text-blue-500 text-lg" aria-label="processing...">processing...</p>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Powered by Next.js, Tailwind CSS, and Zod.
        </p>
      </footer>
    </div>
  );
}