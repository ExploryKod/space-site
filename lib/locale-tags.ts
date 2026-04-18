/**
 * Route / i18n segment → BCP 47 tags for `<html lang>`, `hreflang`, etc.
 * Keep in sync with `supportedLngs` in `i18n.config.ts`.
 */
export const LOCALE_BCP47 = {
  en: "en-US",
  fr: "fr-FR",
} as const;

export type RouteLocale = keyof typeof LOCALE_BCP47;

/** Open Graph uses underscore (e.g. fr_FR), not hyphen. */
export function toOpenGraphLocale(bcp47: string): string {
  return bcp47.replace("-", "_");
}

/** Map route locale (URL segment) to a BCP 47 language tag. */
export function toBcp47(routeLocale: string, fallbackRouteLocale: string): string {
  const direct = LOCALE_BCP47[routeLocale as RouteLocale];
  if (direct) return direct;
  const fb = LOCALE_BCP47[fallbackRouteLocale as RouteLocale];
  if (fb) return fb;
  return "en-US";
}
