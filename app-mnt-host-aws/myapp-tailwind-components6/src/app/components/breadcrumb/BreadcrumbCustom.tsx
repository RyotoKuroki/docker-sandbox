"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
import React, { forwardRef, useState } from "react";

interface BreadProps {
  homeLabel: string;
  history: { lable: string; path: string; args: { [key: string]: string | number | Date } }[];
}
const BreadcrumbCustom = forwardRef<HTMLDivElement, BreadProps>(({ homeLabel, history }, ref) => {
  const [allLinks, setAllLinks] = useState([]);

  const [homeLink, setHomeLink] = useState("");
  const [innerLinks, setInnerLinks] = useState("");
  const [latestLink, setLatestLink] = useState("");

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {/* home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/bread-samples/page1">{homeLabel}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* divide */}
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          {/* logs */}
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                logs
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          {/* divide */}
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          {/* LatestLink */}
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
});
BreadcrumbCustom.displayName = "BreadcrumbCustom";

export { BreadcrumbCustom };
