import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Bellefair } from "next/font/google";
import { initServerI18next } from "next-i18next/server";
import i18nConfig from "@/i18n.config";
import "@/app/globals.css";
import { BodyPageClass } from "@/app/_components/layout/BodyPageClass";

initServerI18next(i18nConfig);

const siteName = "Clean App — Next.js template";
const siteDescription =
  "Auth-first Next.js starter: TypeScript, Prisma, modular architecture, and tests — ready to extend.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-barlow",
  adjustFontFallback: true,
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-barlow-condensed",
  adjustFontFallback: true,
});

const bellefair = Bellefair({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bellefair",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: "Clean App",
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    url: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = i18nConfig.fallbackLng ?? "en";

  return (
    <html
      lang={lang}
      className={`${barlow.variable} ${barlowCondensed.variable} ${bellefair.variable} overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${barlow.className} ${barlowCondensed.variable} ${bellefair.variable} page-home`}
        suppressHydrationWarning
      >
        <BodyPageClass supportedLngs={i18nConfig.supportedLngs} />
        <a href="#main" className="skip-to-main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
