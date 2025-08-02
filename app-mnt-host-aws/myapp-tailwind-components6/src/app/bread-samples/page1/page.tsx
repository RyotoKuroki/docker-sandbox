"use client";

import Link from "next/link";
import { BreadcrumbCustom } from "@/app/components/breadcrumb/BreadcrumbCustom";
import { useState } from "react";

export default function Home() {
  const [links, setLinks] = useState<
    { lable: string; path: string; args: { [key: string]: string | number | Date } }[]
  >([]);

  const commonGridContentStyle = " min-w-[200px] min-h-[100px] p-3 flex justify-center items-center ";
  const commonBtnStyle = " border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-100 p-3 ";
  return (
    <div className="flex flex-center justify-center w-full">
      <div className="grid grid-cols-2 w-full">
        <div className={`${commonGridContentStyle} h-[30px] col-span-2`}>
          <BreadcrumbCustom homeLabel="Home" history={links} />
        </div>
        <div className={`${commonGridContentStyle} bg-green-300 col-span-2`}>
          <div className="flex flex-row items-center">
            <label>param1：</label>
            <input className="w-full border-gray-300 bg-cyan-100 hover:bg-red-300 rounded-lg p-3" />
          </div>
        </div>
        <div className={`${commonGridContentStyle} bg-yellow-300`}>
          <Link className={`${commonBtnStyle} `} href={`/bread-samples/page2`}>
            to Page2
          </Link>
        </div>
        <div className={`${commonGridContentStyle} bg-pink-300`}>
          <Link className={`${commonBtnStyle} `} href={`/bread-samples/page3`}>
            to Page3
          </Link>
        </div>
      </div>
    </div>
  );
}
