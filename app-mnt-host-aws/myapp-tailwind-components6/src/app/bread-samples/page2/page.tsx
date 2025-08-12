"use client";

import { BreadcrumbCustom } from "@/app/components/breadcrumb/BreadcrumbCustom";
import { IBreadCrumbLog } from "@/app/components/breadcrumb/interfaces/IBreadCrumbLog";
import * as breadUtils from "@/app/components/breadcrumb/utils/BreadCrunbUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

/** 画面Aの具象インターフェイス */
interface IPage2Params extends IBreadCrumbLog {
  args: {
    initArgs: {
      val1: string | undefined;
      val2: number | undefined;
      val3: Date | undefined;
    };
    opeArgs: {
      val1: string | undefined;
      val2: number | undefined;
      val3: Date | undefined;
    };
  };
}

const formSchema = z.object({
  val1: z.string(),
  val2: z.coerce.number(),
  val3: z.date(),
});
type formSchemaType = z.infer<typeof formSchema>;
type formSchemaErrorType = z.inferFlattenedErrors<typeof formSchema>["fieldErrors"];

const BREAD_LABEL = "ページ２";
const URL_PATH = "/bread-samples/page2";

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formProxy = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      val1: "a",
      val2: 123,
      val3: new Date(),
    },
    mode: "onBlur", // フォーカスが外れたときにバリデーションを実行
  });

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(new Date());

  const [links, setLinks] = useState<IBreadCrumbLog[]>([]);

  useEffect(() => {
    if (!searchParams) return;

    const bParam = searchParams.get("bread");
    if (!bParam) {
      // パンくず以外の方法でアクセスされた場合のみ、パンくずにリンクを追加する
      const breadCrumbLog = {
        path: URL_PATH,
        queryParams: "bread=true",
        label: BREAD_LABEL,
        args: {
          initArgs: {
            val1: val1,
            val2: val2,
            val3: val3,
          },
          opeArgs: {
            val1: val1,
            val2: val2,
            val3: val3,
          },
        },
      } as IPage2Params;
      breadUtils.addBreadcrumbLog(breadCrumbLog);
    }

    const logs = breadUtils.getBreadcrumbLogs();
    setLinks(logs);
  }, [searchParams]);

  const handleOnLeave = (url: string) => {
    const log = {
      label: BREAD_LABEL,
      queryParams: "",
      path: URL_PATH,
      args: {
        initArgs: {
          val1: undefined,
          val2: undefined,
          val3: undefined,
        },
        opeArgs: {
          val1: val1 ? val1 : undefined,
          val2: val2 ? Number(val2) : undefined,
          val3: val3 ? new Date(val3) : undefined,
        },
      },
    } as IPage2Params;
    breadUtils.addBreadcrumbLog(log);
    router.push(url);
  };

  const commonGridContentStyle = " min-w-[200px] min-h-[100px] p-3 flex justify-center items-center ";
  const commonBtnStyle = " border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-100 p-3 ";
  const commonInputStyle = "w-[200px] border-gray-300 bg-cyan-100 hover:bg-red-300 rounded-lg p-3";
  return (
    <div className="flex flex-center justify-center w-full">
      <div className="grid grid-cols-4 w-full">
        <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
          <BreadcrumbCustom homeLabel="Home" logs={links} />
        </div>
        <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
          <h1>Page2</h1>
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
              router.push(`/bread-samples/page1`);
            }}
          >
            to Page1
          </button>
        </div>
        <div className={`${commonGridContentStyle} bg-yellow-300 opacity-[0.2]`}>
          <button
            disabled={true}
            className={`${commonBtnStyle} `}
            onClick={() => {
              router.push(`/bread-samples/page2`);
            }}
          >
            to Page2
          </button>
        </div>
        <div className={`${commonGridContentStyle} bg-pink-300`}>
          <button
            className={`${commonBtnStyle} `}
            onClick={() => {
              router.push(`/bread-samples/page3`);
            }}
          >
            to Page3
          </button>
        </div>
        <div className={`${commonGridContentStyle} bg-blue-300`}>
          <button
            className={`${commonBtnStyle} `}
            onClick={() => {
              router.push(`/bread-samples/page4`);
            }}
          >
            to Page4
          </button>
        </div>
      </div>
    </div>
  );
}
