import type { Metadata } from "next";
import { getT } from "next-i18next/server";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT("common", { lng });
  return {
    title: t("home.metaTitle"),
  };
}

export default async function Home({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await getT("common", { lng });

  return (
    <main className="main-container main-container--bottom">
      <div className="flex flex-col items-center">
        <h1 className="text-accent fs-500 ff-sans-cond uppercase letter-spacing-1 text-center md:text-left">
          {t("home.preTitle")}
          <span className="block fs-900 ff-serif text-white text-center md:text-left">
            {t("home.heroTitle")}
          </span>
        </h1>

        <p className="text-center max-w-[50ch]">{`${t("home.heroLead")} ${t("home.heroHint")}`}</p>
      </div>
      <div>
        <a href="#" className="space-button uppercase ff-serif fs-600 text-dark bg-white">
          {t("home.explore")}
        </a>
      </div>
    </main>
  );
}
