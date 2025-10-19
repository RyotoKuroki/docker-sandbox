"use client";

import { useEffect, useMemo, useState /*, Suspense*/ } from "react";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormReturn,
  UseFormSetError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // これに変更
import { z, ZodIssue } from "zod";
import {
  searchConditionErrorType,
  searchConditionSchema,
  searchConditionType,
} from "./difinitions/searchConditionSchema";
import { listViewRowType, listViewSchema, listViewType } from "./difinitions/listViewSchema";
import { formSchema, formType, formTypeError } from "./difinitions/formSchema";

/**
 *
 * @returns
 */
export default function HomePage() {
  const searchCondition1Proxy = useForm({
    resolver: zodResolver(searchConditionSchema),
    defaultValues: {
      field1: "",
      field2: "",
    } as searchConditionType,
  });

  const searchCondition2Proxy = useForm({
    resolver: zodResolver(searchConditionSchema),
    defaultValues: {
      field1: "",
      field2: "",
    } as searchConditionType,
  });

  const listViewProxy = useForm({
    resolver: zodResolver(listViewSchema),
    defaultValues: {
      rows: [
        { field1: "1", field2: "あああああ" },
        { field1: "2", field2: "いいいいい" },
        { field1: "3", field2: "ううううう" },
        { field1: "4", field2: "えええええ" },
        { field1: "5", field2: "おおおおお" },
      ] as listViewRowType[],
    } as listViewType,
  });

  // 初期化処理
  useEffect(() => {}, []);

  const _validSearchCondition1 = () => {
    searchCondition1Proxy.clearErrors();

    const args = searchCondition1Proxy.getValues();
    const valid = searchConditionSchema.safeParse(args);
    if (!valid.success) {
      // ZodError.issues を抽出し、ユーティリティ関数に渡す
      _setFormErrors(valid.error.issues, searchCondition1Proxy);
      return;
    }
  };

  const _validSearchCondition2 = () => {
    searchCondition2Proxy.clearErrors();

    const args = searchCondition2Proxy.getValues();
    const valid = searchConditionSchema.safeParse(args);
    if (!valid.success) {
      // ZodError.issues を抽出し、ユーティリティ関数に渡す
      _setFormErrors(valid.error.issues, searchCondition2Proxy);
      return;
    }
  };

  /**
   * Zodのバリデーションエラー(ZodIssue[])をreact-hook-formのエラー形式に変換し、
   * setErrorを使ってフォームに一括設定するユーティリティ関数。
   * @param issues ZodError.issues 配列
   * @param form UseFormReturnオブジェクト
   */
  const _setFormErrors = <T extends FieldValues>(
    issues: ZodIssue[],
    form: UseFormReturn<T>,
  ): void => {
    // 既存のエラーをクリア
    form.clearErrors();

    issues.forEach((issue, index) => {
      // ZodIssueのpathを文字列に変換（例: ['user', 'name'] -> 'user.name'）
      const path = issue.path.join(".") as keyof T;

      // react-hook-formのsetErrorを使ってエラーを設定
      form.setError(
        path as any,
        {
          type: "manual", // 外部からの手動設定であることを示す
          message: issue.message,
        },
        { shouldFocus: index == 0 /*１つめのエラー項目にフォーカス*/ },
      );
    });
  };

  const onClickedRowSubmit = () => {
    const args = listViewProxy.getValues();
    const valid = listViewSchema.safeParse(args);
    if (!valid.success) {
      // ZodError.issues を抽出し、ユーティリティ関数に渡す
      _setFormErrors(valid.error.issues, listViewProxy);
      return;
    }
  };

  const buttonStyle = `border border-gray-500 rounded-lg px-3 bg-blue-200 hover:bg-blue-500 h-[51px]`;
  const inputStyle = `border border-gray-500 rounded-lg p-1 ml-1 h-[51px]`;
  return (
    <div className="grid grid-cols-[1fr_9fr]">
      <div className="bg-red-200 p-2"></div>
      <div className="bg-green-200 p-2">
        <div
          className="space-y-3"
          //onSubmit={formProxy.handleSubmit(handleSearch)}
        >
          <div
            className="grid grid-cols-[1fr_1fr_1fr] "
            onKeyUp={(ev: any) => {
              if (!confirm("検索条件１の入力値をチェックする？")) {
                return;
              }
              _validSearchCondition1();
            }}
          >
            <div>
              <label>field1</label>
              <input
                className={`${inputStyle} ${
                  searchCondition1Proxy.formState?.errors?.field1?.message && "border-red-700"
                }`}
                {...searchCondition1Proxy.register("field1")}
              />
              <span className="pl-1 text-red-700">*</span>
              <span className="pl-1 text-red-700">
                {searchCondition1Proxy.formState?.errors?.field1?.message}
              </span>
            </div>
            <div>
              <label>field2</label>
              <input
                className={`${inputStyle} ${
                  searchCondition1Proxy.formState?.errors?.field2?.message && "border-red-700"
                }`}
                {...searchCondition1Proxy.register("field2")}
              />
              <span className="pl-1 text-red-700">*</span>
              <span className="pl-1 text-red-700">
                {searchCondition1Proxy.formState?.errors?.field2?.message}
              </span>
            </div>
            <div className="flex flex-row">
              <button
                //type="submit"
                name="btn1"
                id="btn1"
                formTarget="btn1"
                onClick={_validSearchCondition1}
                className={`${buttonStyle} w-[230px]`}
              >
                search
              </button>
            </div>
          </div>

          <div
            className="grid grid-cols-[1fr_1fr_1fr] "
            onKeyUp={(ev: any) => {
              if (!confirm("検索条件の２入力値をチェックする？")) {
                return;
              }
              _validSearchCondition2();
            }}
          >
            <div>
              <label>field1</label>
              <input
                className={`${inputStyle} ${
                  searchCondition2Proxy.formState?.errors?.field1?.message && "border-red-700"
                }`}
                {...searchCondition2Proxy.register("field1")}
              />
              <span className="pl-1 text-red-700">*</span>
              <span className="pl-1 text-red-700">
                {searchCondition2Proxy.formState?.errors?.field1?.message}
              </span>
            </div>
            <div>
              <label>field2</label>
              <input
                className={`${inputStyle} ${
                  searchCondition2Proxy.formState?.errors?.field2?.message && "border-red-700"
                }`}
                {...searchCondition2Proxy.register("field2")}
              />
              <span className="pl-1 text-red-700">*</span>
              <span className="pl-1 text-red-700">
                {searchCondition2Proxy.formState?.errors?.field2?.message}
              </span>
            </div>
            <div className="flex flex-row">
              <button
                //type="submit"
                id="btn2"
                name="btn22"
                formTarget="btn2"
                onClick={_validSearchCondition2}
                className={`${buttonStyle} w-[230px]`}
              >
                search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-200 p-2"></div>
      <div className="bg-yellow-200 p-2">
        <label className="w-[150px]">[index]</label> <label className="w-[150px]">[value]</label>
        {listViewProxy.getValues().rows.map((row, index) => (
          <>
            <hr className="border border-blue-300 my-2" />
            <div key={index} className="space-x-3 flex flex-row">
              <div className="w-[120px]">
                {" "}
                <input
                  {...listViewProxy.register(`rows.${index}.field1`)}
                  className="border border-gray-500 rounded-sm p-1 w-[50px]"
                />
                {listViewProxy?.formState?.errors?.rows &&
                  listViewProxy.formState.errors.rows[index]?.field1?.message && (
                    <span className="text-red-700 pl-1">
                      {listViewProxy.formState.errors.rows[index]?.field1?.message}
                    </span>
                  )}
              </div>{" "}
              <div className="w-[190px]">
                <input
                  {...listViewProxy.register(`rows.${index}.field2`)}
                  className="border border-gray-500 rounded-sm p-1 w-[100px]"
                />
                {listViewProxy?.formState?.errors?.rows &&
                  listViewProxy.formState.errors.rows[index]?.field2?.message && (
                    <span className="text-red-700 pl-1">
                      {listViewProxy.formState.errors.rows[index]?.field2?.message}
                    </span>
                  )}
              </div>
            </div>
          </>
        ))}
        <hr className="border border-blue-300 my-2" />
        <button onClick={onClickedRowSubmit} className={`${buttonStyle} mt-0`}>
          Check
        </button>
      </div>
    </div>
  );
}
