"use client";

import { z } from "zod";
import Link from "next/link";
import { BreadcrumbCustom } from "@/app/components/breadcrumb/BreadcrumbCustom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BreadCrumbPageParamsInterface } from "@/app/components/breadcrumb/interfaces/BreadCrumbPageParamsInterface";

/** 画面Aの具象インターフェイス */
class Page3Interface implements BreadCrumbPageParamsInterface {
  breadDisplayLabel!: string;
  pagePath!: string;

  value1Str!: string;
  value2Num!: number;
  value3Date!: Date;

  toJsonStr = () => {
    return JSON.stringify(this);
  };
  fromJsonStr = (value: string) => {
    const _schema = z.object({
      value1Str: z.string(),
      value2Num: z.number(),
      value3Date: z.date(),
    });
    type myParams = z.infer<typeof _schema>;
    try {
      const params: myParams = _schema.parse(JSON.parse(value));
      console.log("fromJson : ", params);

      this.value1Str = params.value1Str;
      this.value2Num = params.value2Num;
      this.value3Date = params.value3Date;
    } catch (error) {
      console.error("バリデーションエラー:", error);
    }
  };
}

export default function page() {
  const router = useRouter();

  const [links, setLinks] = useState<
    { lable: string; path: string; args: { [key: string]: string | number | Date } }[]
  >([]);

  const commonGridContentStyle = " min-w-[200px] min-h-[100px] p-3 flex justify-center items-center ";
  const commonBtnStyle = " border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-100 p-3 ";
  return (
    <div className="flex flex-center justify-center w-full">
      <div className="grid grid-cols-4 w-full">
        <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
          <BreadcrumbCustom homeLabel="Home" history={links} />
        </div>
        <div className={`${commonGridContentStyle} h-[30px] col-span-4`}>
          <h1>Page3</h1>
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
        <div className={`${commonGridContentStyle} bg-pink-300 opacity-[0.2]`}>
          <button
            disabled={true}
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
