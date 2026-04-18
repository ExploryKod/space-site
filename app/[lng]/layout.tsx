import type { Resource } from "i18next";
import { notFound } from "next/navigation";
import { I18nProvider } from "next-i18next/client";
import { getT } from "next-i18next/server";
import i18nConfig from "@/i18n.config";
import enCommon from "@/app/i18n/locales/en/common.json";
import enConnexion from "@/app/i18n/locales/en/connexion.json";
import frCommon from "@/app/i18n/locales/fr/common.json";
import frConnexion from "@/app/i18n/locales/fr/connexion.json";
import { ThemeProvider } from "@modules/app/react/ThemeProvider";
import { SpHeader } from "@/app/_components/layout/SpHeader";

type LngLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
};

/** Bundled for client `I18nProvider` so every namespace (e.g. `connexion`) hydrates reliably. */
const clientI18nResources = {
  en: { common: enCommon, connexion: enConnexion },
  fr: { common: frCommon, connexion: frConnexion },
} satisfies Resource;

export function generateStaticParams() {
  return i18nConfig.supportedLngs.map((lng) => ({ lng }));
}

export default async function LngLayout({ children, params }: LngLayoutProps) {
  const { lng } = await params;

  if (!i18nConfig.supportedLngs.includes(lng)) {
    notFound();
  }

  await getT(["common", "connexion"], { lng });

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
    >
      <I18nProvider
        language={lng}
        resources={clientI18nResources}
        supportedLngs={i18nConfig.supportedLngs}
        fallbackLng={i18nConfig.fallbackLng}
      >
        <SpHeader />
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
