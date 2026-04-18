import type { Metadata } from "next";
import { getT } from "next-i18next/server";
import TechnologySteps from "@/app/_components/molecules/TechnologySteps";

type PageProps = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ technology?: string }>;
};

type TechnologyData = {
  slug: string;
  name: string;
  description: string;
  portrait: string;
  landscape: string;
  alt: string;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT("technology", { lng });
  return {
    title: t("metaTitle"),
  };
}

export default async function Technology({ params, searchParams }: PageProps) {
  const { lng } = await params;
  const resolvedSearchParams = await searchParams;
  const { t } = await getT("technology", { lng });

  const technologySlugs: readonly string[] = ["launch-vehicle", "spaceport", "space-capsule"];

  const missingMarker = (key: string) => `[[MISSING_TRANSLATION:${key}]]`;
  const safeT = (key: string) =>
    t(key, {
      defaultValue: missingMarker(key),
    });

  const isMissing = (value: string, key: string) => value === missingMarker(key);
  const requiredFields = [
    "name",
    "description",
    "portrait",
    "landscape",
    "alt",
  ] as const;

  const technologies: TechnologyData[] = technologySlugs.map((slug) => {
    const data = {
      slug,
      name: safeT(`items.${slug}.name`),
      description: safeT(`items.${slug}.description`),
      portrait: safeT(`items.${slug}.portrait`),
      landscape: safeT(`items.${slug}.landscape`),
      alt: safeT(`items.${slug}.alt`),
    };

    const missingFields = requiredFields.filter((field) =>
      isMissing(data[field], `items.${slug}.${field}`),
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Invalid technology i18n data for "${slug}". Missing fields: ${missingFields.join(", ")}`,
      );
    }

    return data;
  });

  const selectedSlug = resolvedSearchParams.technology;
  const hasSelectedSlug = technologies.some((technology) => technology.slug === selectedSlug);
  const activeTechnology = hasSelectedSlug
    ? (selectedSlug as string)
    : (technologies[0]?.slug ?? "");
  const activeTechnologyData = technologies.find(
    (technology) => technology.slug === activeTechnology,
  );

  if (!activeTechnologyData) {
    throw new Error("No valid technology available for rendering.");
  }

  return (
    <main id="main" className="main-container main-container--technology flow">
   
      <h1 className="numbered-title">
        <span aria-hidden="true">03</span> {safeT("numberedTitle")}
      </h1>

      <TechnologySteps
            technologySteps={technologies.map(({ slug, name }) => ({ slug, srLabel: name }))}
            initialActiveTechnology={activeTechnology}
        />
     
      <article
        className="technology-details flow"
        id={`${activeTechnologyData.slug}-tab`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${activeTechnologyData.slug}-trigger`}
      >
     
        <div>
            <header className="flow flow--space-small">
            <h2 className="fs-600 ff-serif uppercase">{safeT("labels.terminology")}</h2>
            <p className="fs-700 uppercase ff-serif">{activeTechnologyData.name}</p>
            </header>
            <p>{activeTechnologyData.description}</p>
        </div>
      </article>

      <picture id={`${activeTechnologyData.slug}-image`}>
        <source
          media="(min-width: 45em)"
          srcSet={activeTechnologyData.portrait}
        />
        <img src={activeTechnologyData.landscape} alt={activeTechnologyData.alt} />
      </picture>
    </main>
  );
}
