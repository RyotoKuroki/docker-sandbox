"use client";

import { BreadcrumbCustom } from "@/app/components/breadcrumb/BreadcrumbCustom";
import { IBreadCrumbLog } from "@/app/components/breadcrumb/interfaces/IBreadCrumbLog";
import { addBreadcrumbLog, getBreadcrumbLogs } from "@/app/components/breadcrumb/utils/BreadCrunbUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** 画面Aの具象インターフェイス */
interface IPage4Params extends IBreadCrumbLog {
  args: {
    val1: string;
    val2: number;
    val3: Date;
  };
}

export default function page() {
  const router = useRouter();

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(new Date());

  const [links, setLinks] = useState<IBreadCrumbLog[]>([]);

  useEffect(() => {
    const breadCrumbLog = {
      path: "/bread-samples/page4",
      label: "ページ４",
      args: {
        val1: val1,
        val2: val2,
        val3: val3,
      },
    } as IPage4Params;
    addBreadcrumbLog(breadCrumbLog);

    const logs = getBreadcrumbLogs();
    setLinks(logs);
  }, []);

  const commonGridContentStyle = " min-w-[200px] min-h-[100px] p-3 flex justify-center items-center ";
  const commonBtnStyle = " border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-100 p-3 ";
  return (
    <div className="flex flex-center justify-center w-full">
      <div className="grid grid-cols-4 w-full">
        <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
          <BreadcrumbCustom homeLabel="Home" logs={links} />
        </div>
        <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
          <h1>Page4</h1>
        </div>
        <div className={`${commonGridContentStyle} bg-green-300 col-span-4`}>
          <div className="flex flex-row items-center">
            <label>param1：</label>
            <input className="w-full border-gray-300 bg-cyan-100 hover:bg-red-300 rounded-lg p-3" />
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
        <div className={`${commonGridContentStyle} bg-pink-300`}>
          <button
            className={`${commonBtnStyle} `}
            onClick={() => {
              router.push(`/bread-samples/page2`);
            }}
          >
            to Page2
          </button>
        </div>
        <div className={`${commonGridContentStyle} bg-blue-300`}>
          <button
            className={`${commonBtnStyle} `}
            onClick={() => {
              router.push(`/bread-samples/page3`);
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
