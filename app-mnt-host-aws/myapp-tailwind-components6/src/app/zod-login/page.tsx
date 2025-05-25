// app/page.tsx
'use client';

import { useState } from 'react';
import { z } from 'zod';

// Zod スキーマの定義
const FormSchema = z.object({
  name: z.string().min(2, { message: '名前を入力してください。' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
  // 必要に応じて他のフィールドを追加できます
  // age: z.number().min(18, { message: '18歳以上である必要があります。' }).optional(),
});

// Zod スキーマから TypeScript の型を生成
type FormInput = z.infer<typeof FormSchema>;

// エラーメッセージの型を定義（Zodのflatten()を利用する場合）
type FormErrors = z.inferFlattenedErrors<typeof FormSchema>['fieldErrors'];

export default function HomePage() {
  const [formData, setFormData] = useState<Partial<FormInput>>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [submittedData, setSubmittedData] = useState<FormInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
/*
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 入力中にエラーをクリアする（任意）
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
*/
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
    console.log('Form submitted successfully:', result.data);
    setSubmittedData(result.data);
    // フォームをリセット（任意）
    // setFormData({ name: '', email: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          お問い合わせフォーム;;;
        </h1>
{/**/}
        <form onSubmit={handleSubmit} className="space-y-6">
{/**/}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              //onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              aria-describedby="name-error"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-500">
                {errors.name.join(', ')}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              //onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500">
                {errors.email.join(', ')}
              </p>
            )}
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
{/**/}
        </form>
{/**/}
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
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Powered by Next.js, Tailwind CSS, and Zod.
        </p>
      </footer>
    </div>
  );
}