import type { I18nConfig } from 'next-i18next/proxy'

const i18nConfig: I18nConfig = {
  /** BCP 47 mapping: `lib/locale-tags.ts` */
  supportedLngs: ['en', 'fr'],
  fallbackLng: 'en',
  localeInPath: true,
  defaultNS: 'common',
  ns: ['common', 'connexion', 'home', 'destination', 'crew', 'technology'],
  resourceLoader: (language, namespace) =>
    import(`./app/i18n/locales/${language}/${namespace}.json`),
}

export default i18nConfig
