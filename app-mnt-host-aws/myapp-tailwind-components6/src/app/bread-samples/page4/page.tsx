"use client";

import { BreadcrumbCustom } from "@/app/components/breadcrumb/BreadcrumbCustom";
import { IBreadCrumbLog } from "@/app/components/breadcrumb/interfaces/IBreadCrumbLog";
import * as breadUtils from "@/app/components/breadcrumb/utils/BreadCrunbUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

/** 画面Aの具象インターフェイス */
interface IPage4Params extends IBreadCrumbLog {
  args: {
    initArgs: {
      val1: string | undefined;
      val2: number | undefined;
      val3: string | undefined; //Date | undefined;
    };
    opeArgs: {
      val1: string | undefined;
      val2: number | undefined;
      val3: string | undefined; //Date | undefined;
    };
  };
}

const formSchema = z.object({
  val1: z.string().optional(),
  val2: z.coerce.number().optional(),
  val3: z.string().optional(), //z.coerce.date().optional(),
});
type formSchemaType = z.infer<typeof formSchema>;
type formSchemaErrorType = z.inferFlattenedErrors<typeof formSchema>["fieldErrors"];

const BREAD_LABEL = "ページ４";
const URL_PATH = "/bread-samples/page4";

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [handleType, setHandleType] = useState<number>(0);
  const [formData, setFormData] = useState<formSchemaType>({
    val1: undefined,
    val2: undefined,
    val3: undefined,
  });
  const formProxy = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onBlur", // フォーカスが外れたときにバリデーションを実行
  });

  const [links, setLinks] = useState<IBreadCrumbLog[]>([]);

  useEffect(() => {
    if (!searchParams) return;

    const bParam = searchParams.get("bread");
    if (!bParam) {
      const breadCrumbLog = {
        // パンくず以外の方法でアクセスされた場合のみ、パンくずにリンクを追加する
        path: URL_PATH,
        queryParams: "bread=true",
        label: BREAD_LABEL,
        args: {
          initArgs: {
            val1: formData.val1,
            val2: formData.val2,
            val3: formData.val3,
          } as formSchemaType,
        },
      } as IPage4Params;
      breadUtils.addBreadcrumbLog(breadCrumbLog);
    } else {
      // パンくずの場合、前回入力値を復元する
      const val = breadUtils.getBreadcrumbLog(URL_PATH);
      if (val) {
        const log = val.value as IPage4Params;
        const restoreData = {
          val1: log.args.opeArgs?.val1,
          val2: log.args.opeArgs?.val2 ? Number(log.args.opeArgs?.val2) : undefined,
          val3: log.args.opeArgs?.val3 ? log.args.opeArgs?.val3 : undefined,
        } as formSchemaType;
        breadUtils.addBreadcrumbLog(log);

        formProxy.reset(restoreData); // 入力用データ
        setFormData(restoreData); // 表示用データ
      }
    }

    const logs = breadUtils.getBreadcrumbLogs();
    setLinks(logs);
  }, [searchParams]);

  const handleOnLeave = (formData: formSchemaType) => {
    const log = {
      label: BREAD_LABEL,
      queryParams: "bread=true",
      path: URL_PATH,
      args: {
        initArgs: {
          val1: undefined,
          val2: undefined,
          val3: undefined,
        },
        opeArgs: {
          val1: formData?.val1 ? formData.val1 : undefined,
          val2: formData?.val2 ? Number(formData.val2) : undefined,
          val3: formData?.val3 ? formData.val3 : undefined,
        },
      },
    } as IPage4Params;
    breadUtils.addBreadcrumbLog(log);
    const url = `/bread-samples/page${handleType}`;
    router.push(url);
  };

  const commonGridContentStyle = " min-w-[200px] min-h-[100px] p-3 flex justify-center items-center ";
  const commonBtnStyle = " border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-100 p-3 ";
  const commonInputStyle = "w-[200px] border-gray-300 bg-cyan-100 hover:bg-red-300 rounded-lg p-3";
  return (
    <form onSubmit={formProxy.handleSubmit(handleOnLeave)}>
      <div className="flex flex-center justify-center w-full">
        <div className="grid grid-cols-4 w-full">
          <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
            <BreadcrumbCustom homeLabel="Home" logs={links} />
          </div>
          <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
            <h1>Page4</h1>
          </div>
          <div className={`${commonGridContentStyle} bg-green-300 col-span-4 flex flex-row space-x-5`}>
            <div className="flex flex-row items-center">
              <label>in-param：</label>
              <input type="text" {...formProxy.register("val1")} className={commonInputStyle} />
            </div>
            <div className="flex flex-row items-center">
              <label>param2：</label>
              <input type="number" {...formProxy.register("val2")} className={commonInputStyle} />
            </div>
            <div className="flex flex-row items-center">
              <label>param3：</label>
              <input type="date" {...formProxy.register("val3")} className={commonInputStyle} />
            </div>
          </div>
          <div className={`${commonGridContentStyle} bg-yellow-300`}>
            <button
              className={`${commonBtnStyle} `}
              onClick={() => {
                setHandleType(1);
                formProxy.handleSubmit(handleOnLeave);
              }}
            >
              to Page1
            </button>
          </div>
          <div className={`${commonGridContentStyle} bg-pink-300`}>
            <button
              className={`${commonBtnStyle} `}
              onClick={() => {
                setHandleType(2);
                formProxy.handleSubmit(handleOnLeave);
              }}
            >
              to Page2
            </button>
          </div>
          <div className={`${commonGridContentStyle} bg-blue-300`}>
            <button
              className={`${commonBtnStyle} `}
              onClick={() => {
                setHandleType(3);
                formProxy.handleSubmit(handleOnLeave);
              }}
            >
              to Page3
            </button>
          </div>
          <div className={`${commonGridContentStyle} bg-blue-300 opacity-[0.2]`}>
            <button
              disabled={true}
              className={`${commonBtnStyle} `}
              onClick={() => {
                setHandleType(4);
                formProxy.handleSubmit(handleOnLeave);
              }}
            >
              to Page4
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
