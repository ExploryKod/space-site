import type { Metadata } from "next";
import { getT } from "next-i18next/server";

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

  const destinations = ["moon", "mars", "europa", "titan"] as const;
  type DestinationKey = (typeof destinations)[number];
  const activeDestination: DestinationKey = "moon";

  const missingMarker = (key: string) => `[[MISSING_TRANSLATION:${key}]]`;
  const safeT = (key: string) =>
    t(key, {
      defaultValue: missingMarker(key),
    });

  const isMissing = (value: string, key: string) => value === missingMarker(key);

  return (
    <main id="main" className="grid-container grid-container--destination flow">
      <h1 className="numbered-title">
        <span aria-hidden="true">01</span> {safeT("numberedTitle")}
      </h1>


      {destinations.map((slug) => {
        const isActive = slug === activeDestination;
        const pictureId = `${slug}-image`;
        const imageKey = `items.${slug}.image`;
        const altKey = `items.${slug}.alt`;
        const imageVal = safeT(imageKey);
        const altVal = safeT(altKey);

        // For images, assets are not localized; if the i18n image key is missing,
        // fall back to the deterministic local asset path but keep alt visible as the error signal.
        const imgSrc = isMissing(imageVal, imageKey)
          ? `/destination/image-${slug}.png`
          : imageVal;

        return (
          <picture key={slug} id={pictureId} hidden={!isActive}>
            <img
              src={imgSrc}
              alt={altVal}
            />
          </picture>
        );
      })}

      <div
        className="tab-list underline-indicators flex"
        role="tablist"
        aria-label="destination list"
      >
        {destinations.map((slug) => {
          const isActive = slug === activeDestination;
          const pictureId = `${slug}-image`;
          const tabId = `${slug}-tab`;

          return (
            <button
              key={slug}
              aria-selected={isActive}
              role="tab"
              aria-controls={tabId}
              className="uppercase ff-sans-cond text-accent letter-spacing-2"
              tabIndex={isActive ? 0 : -1}
              data-image={pictureId}
            >
              {safeT(`items.${slug}.name`)}
            </button>
          );
        })}
      </div>

      {destinations.map((slug) => {
        const isActive = slug === activeDestination;
        const tabId = `${slug}-tab`;

        return (
          <article
            key={slug}
            hidden={!isActive}
            className="destination-info flow"
            id={tabId}
            tabIndex={isActive ? 0 : -1}
            role="tabpanel"
          >
            <h2 className="fs-800 uppercase ff-serif">
                {safeT(`items.${slug}.name`)}
            </h2>

            <p>{safeT(`items.${slug}.description`)}</p>

            <div className="destination-meta flex">
              <div>
                <h3 className="text-accent fs-200 uppercase">
                  {safeT("labels.avgDistance")}
                </h3>
                <p className="ff-serif uppercase">
                  {safeT(`items.${slug}.distance`)}
                </p>
              </div>
              <div>
                <h3 className="text-accent fs-200 uppercase">
                  {safeT("labels.estTravelTime")}
                </h3>
                <p className="ff-serif uppercase">
                  {safeT(`items.${slug}.travel`)}
                </p>
              </div>
            </div>
          </article>
        );
      })}
  </main>
  );
}








  
 
  
