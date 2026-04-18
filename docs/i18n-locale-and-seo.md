# Locales, BCP 47, and SEO

This project keeps **URL segments** (`/en/…`, `/fr/…`) separate from **language tags** used in HTML and metadata. This note tracks why and where everything lives.

## Concepts

| Term | What we use | Example |
|------|----------------|--------|
| **Route locale** | First path segment; matches `i18n.config.ts` `supportedLngs` | `en`, `fr` |
| **BCP 47** | Value for `<html lang>`, `hreflang`, consistent SEO language | `en-US`, `fr-FR` |
| **Open Graph `locale`** | Facebook-style; **underscore** between language and region | `en_US`, `fr_FR` |

Route slugs stay short and stable. Full BCP 47 tags describe language (+ optional region) for browsers, assistive tech, and crawlers.

## Source of truth

| File / area | Role |
|-------------|------|
| [`i18n.config.ts`](../i18n.config.ts) | `supportedLngs`, `fallbackLng`, namespaces, `localeInPath` |
| [`lib/locale-tags.ts`](../lib/locale-tags.ts) | `LOCALE_BCP47` map, `toBcp47()`, `toOpenGraphLocale()` |
| [`app/layout.tsx`](../app/layout.tsx) | Default `<html lang>` (fallback BCP 47), default `metadata.openGraph.locale` |
| [`app/[lng]/layout.tsx`](../app/[lng]/layout.tsx) | Validates `lng`, `I18nProvider` with `language={lng}` (route key) |
| [`app/_components/layout/BodyPageClass.tsx`](../app/_components/layout/BodyPageClass.tsx) | Client: syncs `document.documentElement.lang` after navigation; body `page-*` and `lang-*` classes |

## Behavior

1. **Server HTML** — Root layout sets `<html lang={toBcp47(fallback, fallback)}>` so the initial document matches the configured fallback in BCP 47.
2. **After navigation (client)** — `BodyPageClass` resolves the active route locale (`useParams` / pathname), sets `document.documentElement.lang = toBcp47(active, fallback)`, and updates body classes.
3. **Body classes** — `lang-en` / `lang-fr` use the **route** key (handy for CSS). The **attribute** uses BCP 47 (`en-US`, `fr-FR`).
4. **Open Graph** — Default site metadata uses `toOpenGraphLocale(toBcp47(fallback, fallback))`. Per-locale pages can override in `generateMetadata` using the same helpers.

## Adding a new language

1. Add the route key to `supportedLngs` in `i18n.config.ts`.
2. Add a row to `LOCALE_BCP47` in `lib/locale-tags.ts` with the correct BCP 47 tag (and region if you need geographic targeting).
3. Add JSON bundles under `app/i18n/locales/<key>/`.
4. Ensure `app/[lng]/` static params and any hard-coded locale checks (e.g. `lib/locale-path.ts`) stay aligned.

## References

- Next.js — [Internationalization](https://nextjs.org/docs/app/guides/internationalization) (routing, `lang` in nested root layout pattern).
- HTML — `lang` uses [BCP 47](https://www.rfc-editor.org/rfc/rfc5646) tags.
- Open Graph — `og:locale` uses the underscore convention (see [Open Graph protocol](https://ogp.me/)).
