import type { Metadata } from "next";
import { getT } from "next-i18next/server";
import DestinationTabs from "@/app/_components/molecules/DestinationTabs";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT("destination", { lng });
  return {
    title: t("metaTitle"),
  };
}

export default async function Destination({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await getT("destination", { lng });

  const destinationSlugs: readonly string[] = ["moon", "mars", "europa", "titan"];

  const missingMarker = (key: string) => `[[MISSING_TRANSLATION:${key}]]`;
  const safeT = (key: string) =>
    t(key, {
      defaultValue: missingMarker(key),
    });

  const isMissing = (value: string, key: string) => value === missingMarker(key);
  const requiredFields = ["name", "description", "distance", "travel", "image", "webp", "alt"] as const;

  type DestinationData = {
    slug: string;
    name: string;
    description: string;
    distance: string;
    travel: string;
    image: string;
    webp: string;
    alt: string;
  };

  const destinations: DestinationData[] = destinationSlugs.map((slug) => {
    const data = {
      slug,
      name: safeT(`items.${slug}.name`),
      description: safeT(`items.${slug}.description`),
      distance: safeT(`items.${slug}.distance`),
      travel: safeT(`items.${slug}.travel`),
      image: safeT(`items.${slug}.image`),
      webp: safeT(`items.${slug}.webp`),
      alt: safeT(`items.${slug}.alt`),
    };

    const missingFields = requiredFields.filter((field) =>
      isMissing(data[field], `items.${slug}.${field}`),
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Invalid destination i18n data for "${slug}". Missing fields: ${missingFields.join(", ")}`,
      );
    }

    return data;
  });

  const destinationTabsData = destinations.map(({ slug, name }) => ({ slug, name }));
  const activeDestination = destinations[0]?.slug ?? "";

  return (
    <main id="main" className="main-container main-container--destination flow">
      <h1 className="numbered-title">
        <span aria-hidden="true">01</span> {safeT("numberedTitle")}
      </h1>


      {destinations.map((destination) => {
        const isActive = destination.slug === activeDestination;
        const pictureId = `${destination.slug}-image`;

        return (
          <picture key={destination.slug} id={pictureId} hidden={!isActive}>
            <source srcSet={destination.webp} type="image/webp" />
            <img
              src={destination.image}
              alt={destination.alt}
            />
          </picture>
        );
      })}

   
      <DestinationTabs
        destinations={destinationTabsData}
        activeDestination={activeDestination}
      />

      {destinations.map((destination) => {
        const isActive = destination.slug === activeDestination;
        const tabId = `${destination.slug}-tab`;

        return (
          <article
            key={destination.slug}
            hidden={!isActive}
            className="destination-info flow"
            id={tabId}
            tabIndex={isActive ? 0 : -1}
            role="tabpanel"
          >
            <h2 className="fs-800 uppercase ff-serif">
                {destination.name}
            </h2>

            <p>{destination.description}</p>

            <div className="destination-meta flex">
              <div>
                <h3 className="text-accent fs-200 uppercase">
                  {safeT("labels.avgDistance")}
                </h3>
                <p className="ff-serif uppercase">
                  {destination.distance}
                </p>
              </div>
              <div>
                <h3 className="text-accent fs-200 uppercase">
                  {safeT("labels.estTravelTime")}
                </h3>
                <p className="ff-serif uppercase">
                  {destination.travel}
                </p>
              </div>
            </div>
          </article>
        );
      })}
  </main>
  );
}








  
 
  
