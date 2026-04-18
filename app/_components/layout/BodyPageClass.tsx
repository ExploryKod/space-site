"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { toBcp47 } from "@/lib/locale-tags";

type BodyPageClassProps = {
  supportedLngs: readonly string[];
  fallbackLng: string;
};

function getPageClass(pathname: string | null, supportedLngs: readonly string[]) {
  const segments = (pathname ?? "/").split("/").filter(Boolean);

  if (segments[0] && supportedLngs.includes(segments[0])) {
    segments.shift();
  }

  const lastPart = segments.at(-1) ?? "home";
  return `page-${lastPart}`;
}

/** Resolves active locale for body classes and <html lang> (BCP 47). */
function getActiveLng(
  pathname: string | null,
  params: Record<string, string | string[] | undefined>,
  supportedLngs: readonly string[],
  fallbackLng: string,
) {
  const fromParams = params.lng;
  if (typeof fromParams === "string" && supportedLngs.includes(fromParams)) {
    return fromParams;
  }
  const first = (pathname ?? "/").split("/").filter(Boolean)[0];
  if (first && supportedLngs.includes(first)) return first;
  return fallbackLng;
}

export function BodyPageClass({ supportedLngs, fallbackLng }: BodyPageClassProps) {
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const pageClass = getPageClass(pathname, supportedLngs);
    const lng = getActiveLng(pathname, params, supportedLngs, fallbackLng);
    const langClass = `lang-${lng}`;
    const body = document.body;

    document.documentElement.lang = toBcp47(lng, fallbackLng);

    const pageClassesToRemove = Array.from(body.classList).filter((className) =>
      className.startsWith("page-"),
    );
    const langClassesToRemove = Array.from(body.classList).filter((className) =>
      className.startsWith("lang-"),
    );
    body.classList.remove(...pageClassesToRemove, ...langClassesToRemove);
    body.classList.add(pageClass, langClass);
  }, [pathname, params, supportedLngs, fallbackLng]);

  return null;
}
