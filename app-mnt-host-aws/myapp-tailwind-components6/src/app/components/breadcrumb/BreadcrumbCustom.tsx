"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, SlashIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef, useMemo, useState } from "react";
import { IBreadCrumbLog } from "./interfaces/IBreadCrumbLog";

interface BreadProps {
  homeLabel: string;
  logs: IBreadCrumbLog[]; // { lable: string; path: string; args: { [key: string]: string | number | Date } }[];
}
const BreadcrumbCustom = forwardRef<HTMLDivElement, BreadProps>(
  ({ homeLabel, logs }: { homeLabel: string; logs: IBreadCrumbLog[] }, ref) => {
    //const [allLinks, setAllLinks] = useState<IBreadCrumbLog[]>([]);
    //const [homeLink, setHomeLink] = useState("");
    const [first, setFirst] = useState<IBreadCrumbLog | null>(null);
    const [middleLogs, setMiddleLogs] = useState<IBreadCrumbLog[]>([]);
    const [last, setLast] = useState<IBreadCrumbLog | null>(null);

    useMemo(() => {
      // 先頭
      const first = logs != undefined && logs.length > 0 ? logs[0] : null;
      setFirst(first);
      // 末尾。ただしそもそも１件ならば先頭と同値なので無視する。
      const last = logs != undefined && logs.length > 1 ? logs[logs.length - 1] : null;
      setLast(last);
      // ドロップダウンに隠すログリスト。ただしそもそも２件ならば先頭＋末尾と同値なので無視する。
      debugger;
      const mids = [] as IBreadCrumbLog[];
      logs.forEach((each, index) => {
        if (index == 0 || index == logs.length - 1) return;

        const eachStr = JSON.stringify(each);
        mids.push(JSON.parse(eachStr));
      });
      setMiddleLogs(mids);
    }, [logs]);

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {first != null && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href={first.path}>{first.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {middleLogs != null && middleLogs.length > 0 && (
              <>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                      logs
                      <ChevronDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {middleLogs.map((item) => (
                        <DropdownMenuItem key={item.path}>{item.label}</DropdownMenuItem>
                      ))}
                      {/* <DropdownMenuItem>Documentation</DropdownMenuItem>
                        <DropdownMenuItem>Themes</DropdownMenuItem>
                        <DropdownMenuItem>GitHub</DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </>
            )}
            {last != null && (
              <>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href={last.path}>{last.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  },
);
BreadcrumbCustom.displayName = "BreadcrumbCustom";

export { BreadcrumbCustom };
