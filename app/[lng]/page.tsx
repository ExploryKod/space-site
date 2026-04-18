import type { Metadata } from "next";
import Link from "next/link";
import { getT } from "next-i18next/server";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT("home", { lng });
  return {
    title: t("metaTitle"),
  };
}

export default async function Home({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await getT("home", { lng });

  return (
    <main id="main" className="main-container main-container--bottom main-container--home">
      <div className="flex flex-col items-center">
        <h1 className="text-accent fs-500 ff-sans-cond uppercase letter-spacing-1 text-center md:text-left">
          {t("preTitle")}
          <span className={`block fs-900 ff-serif text-white whitespace-nowrap text-center md:text-left ${lng === "fr" ? "fs-900-fr" : "fs-900"}`}>
            {t("heroTitle")}
          </span>
        </h1>
         <div className="w-full flex flex-col items-center md:items-start">
           <p className="text-center md:text-left max-w-[50ch]">{`${t("heroLead")} ${t("heroHint")}`}</p>
        </div>
      </div>
      <div>
        <Link href={`/${lng}/destination`} className="space-button uppercase ff-serif fs-600 text-dark bg-white">
          {t("explore")}
        </Link>
      </div>
    </main>
  );
}
