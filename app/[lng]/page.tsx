import type { Metadata } from "next";
import { getT } from "next-i18next/server";
import { Section } from "@components/sections/Section";

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
          <div className="">
            <h1 className="text-accent fs-500 ff-sans-cond uppercase letter-spacing-1 text-center md:text-left">
              So, you want to travel to
              <span className="block fs-900 ff-serif text-white text-center md:text-left">Space</span>
            </h1>
              
            <p className="max-w-[50ch]">Let’s face it; if you want to go to space, you might as well genuinely go to 
            outer space and not hover kind of on the edge of it. Well sit back, and relax 
            because we’ll give you a truly out of this world experience! </p>
          </div>
          <div>
              <a href="#" className="space-button uppercase ff-serif fs-600 text-dark bg-white">Explore</a>
          </div>
        </main>
    
  );
}
