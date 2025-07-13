'use client';

import { useEffect, useMemo, useState/*, Suspense*/ } from 'react';
//import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // これに変更
import { z } from 'zod';
import {
  uiItemNames,
  cautionName,
} from "./schemas";
import { Toaster, toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import MyModal from './dialog-sample';
import CompletedArea from './completed-area';
//import Loading from "@/app/loading";
import {
  inDtoSaveSomeSchema,
  inDtoSaveSomeType,
  inDtoSaveSomeErrorType,
} from "./server-actions/save-somedata/action-save-somedata-schema";
import { sendMail } from './server-actions/action-sample';
//import { ResultServ, validateOnServer } from './server-actions/action-validation';
import Link from 'next/link';
import { inDtoType } from './server-actions/initialize/action-initialize-schema';
import { initializeAction } from './server-actions/initialize/action-initialize';
import { ApiResultCommon } from '@/lib/api/ApiResultCommon';
import { compareAsc, format } from "date-fns";
import { saveSomedataAction } from './server-actions/save-somedata/action-save-somedata';
import { ChevronDownIcon, SlashIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * 
 * @returns 
 */
export default function HomePage() {
  const searchParams = useSearchParams()
  // 初期化処理
  useEffect(() => {
    
    // found search-param[p1]
    const params1 = searchParams && searchParams.get('p1')
    if (params1)
      toast.info(`URLパラメータ：P1=${params1}`);

    // init in server
    const init = async () => {
      const inDto = {
        //currentDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        currentDate: new Date().toISOString(),
      } as inDtoType;
      const resultInitAction = await initializeAction(inDto) as ApiResultCommon;
      if (!resultInitAction.success) {
        toast.error(`初期化失敗=${resultInitAction.errorMsg}`);
      } else {
        toast.info(`初期化成功=${resultInitAction.data.currentDate}`);
      }
    };
    init();

  }, []);

  const [errors, setErrors] = useState<Partial<inDtoSaveSomeErrorType>>({});
  const [submittedData, setSubmittedData] = useState<inDtoSaveSomeType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMyModalOpened, setIsMyModalOpened] = useState(false);

  const proxyForm = useForm<inDtoSaveSomeType>({
    resolver: zodResolver(inDtoSaveSomeSchema),
    defaultValues: {
      name: "xxx",
      email: "hoge@somedomain.com",
      nickname: "",
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
      control: proxyForm.control,
      name: uiItemNames.emailList, // 'subs',
  });

  /** submit処理 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    // ページリロードをキャンセル
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});
    setSubmittedData(null);
    setIsMyModalOpened(false);
    
    // フォームデータ取得
    const formData = proxyForm.getValues();
    let toastMsg = "";
    let resultData = null;
    // validation
    switch (formData.validSide) {

      case "CLIENT":
        // validate on server-side
        const resultValidClient = inDtoSaveSomeSchema.safeParse(formData);
        if (!resultValidClient.success) {
          // バリデーションエラーがある場合
          const fieldErrors = resultValidClient.error.flatten().fieldErrors as inDtoSaveSomeErrorType;
          setErrors(fieldErrors);
          setIsSubmitting(false);
          
          toastMsg = "validation-error on【CLIENT】.";
        } else {
          resultData = resultValidClient.data;
        }
        break;

      case "SERVER":
        //const resultValidServer = await validateOnServer(formData) as ResultServ;
        const resultSaveSome = await saveSomedataAction(formData) as ApiResultCommon;
        if (!resultSaveSome.success &&
             resultSaveSome.errorOnValidate) {
          const fieldErrors = resultSaveSome.errorOnValidate as inDtoSaveSomeErrorType;
          setErrors(fieldErrors);
          setIsSubmitting(false);

          toastMsg = "validation-error on【SERVER】.";
        } else if (!resultSaveSome.success) {
          toastMsg = `err on【SERVER】：${resultSaveSome.errorMsg}`;
        } else {
          resultData = resultSaveSome.data;
        }
        break;
      default:
        return;
    }

    if (toastMsg) {
      toast.error(
        <>
          <div className='h-full w-full bg-green-300 bounded-xl p-3 m-3'>
            <h3>{toastMsg}</h3>
          </div>
        </>
      );
      return;
    }

    // toast
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "✕",
        onClick: () => console.log("Undo"),
      },
    });

    await sendMail();

    // DB更新処理
    setTimeout(() => {
      // バリデーション成功
      // ここでAPIへのデータ送信などの非同期処理を行うことができます
      // 例: await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted successfully:', resultData);
      setSubmittedData(resultData);
      setIsMyModalOpened(true);
      // フォームをリセット（任意）
      // setFormData({ name: '', email: '' });
      setIsSubmitting(false);
      
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                Components
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          お問い合わせフォーム
        </h1>

        <p className='whitespace-pre-wrap py-5'>
          {cautionName}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor={proxyForm.register(uiItemNames.name).name}
            >
              氏名
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              aria-describedby={`${uiItemNames.name}-${uiItemNames.error}`}
              {...proxyForm.register(uiItemNames.name)}
              id={proxyForm.register(uiItemNames.name).name}
            />
            {errors.name && (
              <p id={`${uiItemNames.name}-${uiItemNames.error}`} className="mt-1 text-xs text-red-500">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor={proxyForm.register(uiItemNames.email).name}
            >
              メールアドレス
            </label>
            <input
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              aria-describedby={`${uiItemNames.email}-${uiItemNames.error}`}
              {...proxyForm.register(uiItemNames.email)}
              id={proxyForm.register(uiItemNames.email).name}
            />
            {errors.email && (
              <p id={`${uiItemNames.email}-${uiItemNames.error}`} className="mt-1 text-xs text-red-500">
                {errors.email.join(', ')}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ニックネーム
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.nickname ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...proxyForm.register(uiItemNames.nickname)}
            />
            {errors.nickname && (
              <p className="mt-1 text-xs text-red-500">
                {errors.nickname[0]}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1">
              Subメールアドレス
            </label>
            {fields.map((sub, index) => (
              <div className='flex flex-row justify-start items-start gap-2' key={index}>
                <div className='w-[30%] items-start'>
                  <input
                    type="number"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      (proxyForm.formState.errors.subs?.[index]?.priority) ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-describedby={`${uiItemNames.emailList}-${index}-${uiItemNames.priority}-${uiItemNames.error}`}
                    {...proxyForm.register(`${uiItemNames.emailList}.${index}.${uiItemNames.priority}`)}
                    id={`${uiItemNames.emailList}.${index}.${uiItemNames.priority}`}
                    placeholder='優先度'
                  />
                  {proxyForm.formState.errors.subs?.[index]?.priority && (
                    <p id={`${uiItemNames.emailList}-${index}-${uiItemNames.priority}-${uiItemNames.error}`} className="mt-1 text-xs text-red-500">
                      {proxyForm.formState.errors.subs[index]?.priority?.message}
                    </p>
                  )}
                </div>
                <div className='flex-1 items-start'>
                  <input
                    type="email"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      (proxyForm.formState.errors.subs?.[index]?.subEmail) ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    aria-describedby={`${uiItemNames.emailList}-${index}-${uiItemNames.subEmail}-${uiItemNames.error}`}
                    {...proxyForm.register(`${uiItemNames.emailList}.${index}.${uiItemNames.subEmail}`)}
                    id={`${uiItemNames.emailList}.${index}.${uiItemNames.subEmail}`}
                    placeholder='sub-email'
                  />
                  {proxyForm.formState.errors.subs?.[index]?.subEmail && (
                    <p id={`${uiItemNames.emailList}-${index}-${uiItemNames.subEmail}-${uiItemNames.error}`} className="mt-1 text-xs text-red-500">
                      {proxyForm.formState.errors.subs[index]?.subEmail?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-row gap-5'>
            <div>
              バリデーション処理
            </div>
            <div className='flex flex-row gap-3'>
              <label><input type='radio' value="CLIENT"
              {...proxyForm.register(uiItemNames.validSide)} defaultChecked /> Client</label>
              <label><input type='radio' value="SERVER"
              {...proxyForm.register(uiItemNames.validSide)} /> Server</label>
            </div>
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
          
          <div className='w-full text-center'>
            <Link href="http://localhost:1080" target="_blank" className='text-blue-500'><u>maildev</u></Link>
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
      
      {isMyModalOpened &&
        <MyModal
          open={isMyModalOpened}
          children={<CompletedArea title='Succeeeeeeeeeeded!!' className='' />}
          onCancel={() => setIsMyModalOpened(false)}
          onOk={() => {
            setIsMyModalOpened(false)

            // toast
            toast.success("Succeeeeeeeeeeeded!");

            toast(
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2 items-center">
                  <div>Good Morning</div>
                </div>
                <div className='flex flex-row'>
                  <div>
                    <div className="flex justify-center items-center">
                      <div className="bg-yellow-400 rounded-full w-24 h-24 flex justify-center items-center">
                        <div className="bg-yellow-500 rounded-full w-16 h-16 flex justify-center items-center">
                          <div className="bg-yellow-600 rounded-full w-8 h-8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center">
                      <div className="bg-yellow-400 rounded-full w-24 h-24 flex justify-center items-center">
                        <div className="bg-yellow-500 rounded-full w-16 h-16 flex justify-center items-center">
                          <div className="bg-yellow-600 rounded-full w-8 h-8"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-center justify-center items-center h-full w-full p-3">
                      <h3>
                        カスタムトーストだぜええええええ！！！
                      </h3>
                    </div>
                  </div>
                </div>
              </div>);
          }}
        />
      }
    
    {/** TODO 全画面で利用するならば、layout.tsx に記述した方が良い！ */}
    <Toaster richColors />

    </div>
  );
}