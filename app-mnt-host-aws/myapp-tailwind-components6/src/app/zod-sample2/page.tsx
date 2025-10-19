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
// import { uiItemNames, cautionName } from "./schemas";
// import { Toaster, toast } from "sonner";
// import { useSearchParams } from "next/navigation";
// import MyModal from "./dialog-sample";
// import CompletedArea from "./completed-area";
// //import Loading from "@/app/loading";
// import {
//   inDtoSaveSomeSchema,
//   inDtoSaveSomeType,
//   inDtoSaveSomeErrorType,
//   ValidatiionSideEnum,
// } from "./server-actions/save-somedata/action-save-somedata-schema";
// import { sendMail } from "./server-actions/action-sample";
// //import { ResultServ, validateOnServer } from './server-actions/action-validation';
// import Link from "next/link";
// import { inDtoType } from "./server-actions/initialize/action-initialize-schema";
// import { initializeAction } from "./server-actions/initialize/action-initialize";
// import { ApiResultCommon } from "@/lib/api/ApiResultCommon";
// import { compareAsc, format } from "date-fns";
// import { saveSomedataAction } from "./server-actions/save-somedata/action-save-somedata";
// import { ChevronDownIcon, SlashIcon } from "lucide-react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import ListSample from "./_components/list-sample";

/**
 *
 * @returns
 */
export default function HomePage() {
  // const searchParams = useSearchParams();

  // const [errors, setErrors] = useState<inDtoSaveSomeErrorType>({});
  // const [submittedData, setSubmittedData] = useState<inDtoSaveSomeType | null>(null);
  // const [isPending, setIsPending] = useState(false);
  // const [isMyModalOpened, setIsMyModalOpened] = useState(false);

  // const formProxy = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     searchCondition1: {} as searchConditionType,
  //     searchCondition2: {} as searchConditionType,
  //     rows: [] as listViewRowType[],
  //   },
  // });

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

  // 初期化処理
  useEffect(() => {}, []);

  // const handleSearch = (args: any) => {
  //   //debugger;
  //   console.log("hogehogjeojfo", args);

  //   formProxy.clearErrors();

  //   const senderId = args.currentTarget.id;
  //   const values = formProxy.getValues();
  //   let condition: searchConditionType;
  //   switch (senderId) {
  //     case "btn1":
  //       condition = values.searchCondition1;
  //       // formProxy.handleSubmit(() => {
  //       //   _validSearchCondition1();
  //       // });
  //       break;
  //     case "btn2":
  //       condition = values.searchCondition2;
  //       // formProxy.handleSubmit(() => {
  //       //   _validSearchCondition2();
  //       // });
  //       break;
  //     default:
  //       throw new Error("searchLayer not found.");
  //   }
  //   const valid = searchConditionSchema.safeParse(condition);
  //   if (!valid.success) {
  //     debugger;
  //     const err1 = valid.error.formErrors.fieldErrors;
  //     const err2 = valid.error.format();
  //     formProxy.setError();
  //     return;
  //   }
  // };

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

    issues.forEach((issue) => {
      // ZodIssueのpathを文字列に変換（例: ['user', 'name'] -> 'user.name'）
      const path = issue.path.join(".") as keyof T;

      // react-hook-formのsetErrorを使ってエラーを設定
      form.setError(
        path as any,
        {
          type: "manual", // 外部からの手動設定であることを示す
          message: issue.message,
        },
        { shouldFocus: true },
      );
    });
  };

  const buttonStyle = `border border-gray-500 rounded-lg px-3 bg-blue-200 hover:bg-blue-500 h-[51px]`;
  const inputStyle = `border border-gray-500 rounded-lg p-1 ml-1 h-[51px]`;
  return (
    <div className="grid grid-cols-[1fr_9fr]">
      <div className="bg-red-200 p-2"></div>
      <div className="bg-green-200 p-2">
        <div
          className="grid grid-cols-[1fr_1fr_1fr] space-y-3"
          //onSubmit={formProxy.handleSubmit(handleSearch)}
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
      <div className="bg-blue-200 p-2"></div>
      <div className="bg-yellow-200 p-2">bbbbbbbb</div>
    </div>
  );
}
