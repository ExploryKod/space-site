import { createProxy } from "next-i18next/proxy";
import i18nConfig from "./i18n.config";
import type { NextRequest } from "next/server";

const i18nProxy = createProxy(i18nConfig);

export function proxy(request: NextRequest) {
  const response = i18nProxy(request);
  response.headers.set("x-current-path", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|manifest.webmanifest).*)",
  ],
};