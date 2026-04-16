"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type BodyPageClassProps = {
  supportedLngs: readonly string[];
};

function getPageClass(pathname: string | null, supportedLngs: readonly string[]) {
  const segments = (pathname ?? "/").split("/").filter(Boolean);

  if (segments[0] && supportedLngs.includes(segments[0])) {
    segments.shift();
  }

  const lastPart = segments.at(-1) ?? "home";
  return `page-${lastPart}`;
}

export function BodyPageClass({ supportedLngs }: BodyPageClassProps) {
  const pathname = usePathname();

  useEffect(() => {
    const pageClass = getPageClass(pathname, supportedLngs);
    const body = document.body;

    const classesToRemove = Array.from(body.classList).filter((className) =>
      className.startsWith("page-"),
    );
    body.classList.remove(...classesToRemove);
    body.classList.add(pageClass);
  }, [pathname, supportedLngs]);

  return null;
}
