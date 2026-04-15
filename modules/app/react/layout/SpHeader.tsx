"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar";



export const SpHeader: React.FC = () => {
  const pathname = usePathname();
  const { ref } = useElementHeightCssVar({
    cssVarName: "--header-height",
    initialPx: 0,
    writeTo: "root",
  });

  return (
    <header ref={ref} className="flex items-center gap-4">
      <div>
        <Image src="/shared/logo.svg" alt="space tourism logo" className="h-auto w-auto" width={100} height={100} />
      </div>
      <nav>
        <ul className="m-0 flex list-none gap-32 p-0">
          <li
            className={`cursor-pointer border-0 border-b-[0.2rem] py-8 ${
              pathname === "/" ? "border-b-white text-white" : "border-b-transparent hover:border-b-white/50 focus-within:border-b-white/50"
            }`}
          >
            <Link className="font-bold [font-family:var(--ff-sans-cond)] uppercase tracking-[2.7px] text-white no-underline" href="/">
              <span className="mr-2 font-bold">00</span>Home
            </Link>
          </li>
          <li
            className={`cursor-pointer border-0 border-b-[0.2rem] py-8 ${
              pathname === "/destination"
                ? "border-b-white text-white"
                : "border-b-transparent hover:border-b-white/50 focus-within:border-b-white/50"
            }`}
          >
            <Link
              className="font-bold [font-family:var(--ff-sans-cond)] uppercase tracking-[2.7px] text-white no-underline"
              href="/destination"
            >
              <span className="mr-2 font-bold">01</span>Destination
            </Link>
          </li>
          <li
            className={`cursor-pointer border-0 border-b-[0.2rem] py-8 ${
              pathname === "/crew"
                ? "border-b-white text-white"
                : "border-b-transparent hover:border-b-white/50 focus-within:border-b-white/50"
            }`}
          >
            <Link className="font-bold [font-family:var(--ff-sans-cond)] uppercase tracking-[2.7px] text-white no-underline" href="/crew">
              <span className="mr-2 font-bold">02</span>Crew
            </Link>
          </li>
          <li
            className={`cursor-pointer border-0 border-b-[0.2rem] py-8 ${
              pathname === "/technology"
                ? "border-b-white text-white"
                : "border-b-transparent hover:border-b-white/50 focus-within:border-b-white/50"
            }`}
          >
            <Link
              className="font-bold [font-family:var(--ff-sans-cond)] uppercase tracking-[2.7px] text-white no-underline"
              href="/technology"
            >
              <span className="mr-2 font-bold">03</span>Technology
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};