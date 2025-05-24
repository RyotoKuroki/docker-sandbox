// app/page.tsx
'use client'; // クライアントコンポーネントとして宣言

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils'; // cnユーティリティ関数のインポート
//import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
/*
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
*/
//import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
//import { AlertCircle, PlusCircle, Trash2 } from "lucide-react";
//import { motion, AnimatePresence } from 'framer-motion';

// Zodスキーマ定義
const itemSchema = z.object({
    itemName: z.string().min(1, { message: 'アイテム名は必須です' }),
    quantity: z.coerce.number().min(1, { message: '数量は1以上である必要があります' }),
});

const formSchema = z.object({
    orderName: z.string().min(3, {
        message: '注文名は3文字以上である必要があります',
    }),
    items: z.array(itemSchema).min(1, {
        message: '少なくとも1つのアイテムを追加してください',
    }),
});

// フォームの型定義
type FormData = z.infer<typeof formSchema>;

export default function ListInputForm() {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderName: '',
            items: [{ itemName: '', quantity: 1 }], // 初期値として1つのアイテムを設定
        },
        mode: 'onBlur', // フォーカスが外れたときにバリデーションを実行
    });

    // useFieldArray を使用して、アイテムの配列を管理
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'items',
    });

    const onSubmit = async (values: FormData) => {
        setSubmitError(null);
        setIsSubmitted(false);
        setSubmittedData(null);

        console.log('フォームデータ:', values);

        try {
            // ここでAPIリクエストなどを実行
            await new Promise(resolve => setTimeout(resolve, 1000)); // 擬似的なAPIコール
            
            // 成功した場合
            alert('フォームが正常に送信されました！');
            setSubmittedData(values);
            setIsSubmitted(true);
            form.reset(); // フォームをリセット
        } catch (error: any) {
            console.error("送信エラー:", error);
            setSubmitError(error.message || 'フォームの送信に失敗しました。');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl border border-gray-200"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    注文フォーム
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* 注文名フィールド */}
                        <FormField
                            control={form.control}
                            name="orderName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">注文名</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="例: 文具発注、備品購入"
                                            {...field}
                                            className="focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        この注文の分かりやすい名前を入力してください。
                                    </FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        {/* アイテムリストのフィールド */}
                        <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
                                アイテムリスト
                                <Button
                                    type="button"
                                    onClick={() => append({ itemName: '', quantity: 1 })}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    アイテムを追加
                                </Button>
                            </h2>
                            <AnimatePresence>
                                {fields.map((field, index) => (
                                    <motion.div
                                        key={field.id} // useFieldArrayが提供するユニークID
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-end gap-3 p-3 border border-gray-200 rounded-md bg-white shadow-sm"
                                    >
                                        {/* アイテム名 */}
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.itemName`} // 配列のパスを指定
                                            render={({ field: itemField }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel className={cn(index !== 0 && "sr-only", "text-gray-700")}>アイテム名</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="例: ボールペン"
                                                            {...itemField}
                                                            className="focus:ring-green-500 focus:border-green-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* 数量 */}
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.quantity`} // 配列のパスを指定
                                            render={({ field: quantityField }) => (
                                                <FormItem className="w-24">
                                                    <FormLabel className={cn(index !== 0 && "sr-only", "text-gray-700")}>数量</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="数量"
                                                            {...quantityField}
                                                            onChange={e => {
                                                                // Input type="number" から数値に変換して更新
                                                                quantityField.onChange(parseInt(e.target.value, 10) || 0);
                                                            }}
                                                            className="focus:ring-green-500 focus:border-green-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* 削除ボタン */}
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="w-10 h-10 flex-shrink-0"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                            <span className="sr-only">アイテムを削除</span>
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {/* アイテムリスト全体のバリデーションエラーメッセージ */}
                            {form.formState.errors.items && (
                                <p className="text-red-500 text-sm mt-2">
                                    {form.formState.errors.items.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition-colors duration-200"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? '送信中...' : '注文を確定'}
                        </Button>

                        {submitError && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>エラー</AlertTitle>
                                <AlertDescription>{submitError}</AlertDescription>
                            </Alert>
                        )}

                        {isSubmitted && submittedData && (
                            <Alert className="mt-4 bg-green-50 text-green-800 border-green-300">
                                <AlertTitle>送信成功！</AlertTitle>
                                <AlertDescription>
                                    <pre className="whitespace-pre-wrap">
                                        {JSON.stringify(submittedData, null, 2)}
                                    </pre>
                                </AlertDescription>
                            </Alert>
                        )}
                    </form>
                </Form>
            </motion.div>
        </div>
    );
}