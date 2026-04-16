import CrewDots from "@/app/_components/molecules/CrewDots";
import { getT } from "next-i18next/server";

type PageProps = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ crew?: string }>;
};

type CrewMember = {
  slug: string;
  srLabel: string;
  role: string;
  name: string;
  description: string;
  image: string;
  webp: string;
  alt: string;
};

export default async function Crew({ params, searchParams }: PageProps) {
  const { lng } = await params;
  const resolvedSearchParams = await searchParams;
  const { t } = await getT("crew", { lng });

  const crewSlugs: readonly string[] = [
    "commander",
    "mission-specialist",
    "pilot",
    "engineer",
  ];

  const missingMarker = (key: string) => `[[MISSING_TRANSLATION:${key}]]`;
  const safeT = (key: string) =>
    t(key, {
      defaultValue: missingMarker(key),
    });

  const isMissing = (value: string, key: string) => value === missingMarker(key);
  const requiredFields = [
    "srLabel",
    "role",
    "name",
    "description",
    "image",
    "webp",
    "alt",
  ] as const;

  const crewMembers: CrewMember[] = crewSlugs.map((slug) => {
    const data = {
      slug,
      srLabel: safeT(`items.${slug}.srLabel`),
      role: safeT(`items.${slug}.role`),
      name: safeT(`items.${slug}.name`),
      description: safeT(`items.${slug}.description`),
      image: safeT(`items.${slug}.image`),
      webp: safeT(`items.${slug}.webp`),
      alt: safeT(`items.${slug}.alt`),
    };

    const missingFields = requiredFields.filter((field) =>
      isMissing(data[field], `items.${slug}.${field}`),
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Invalid crew i18n data for "${slug}". Missing fields: ${missingFields.join(", ")}`,
      );
    }

    return data;
  });

  const selectedSlug = resolvedSearchParams.crew;
  const hasSelectedSlug = crewMembers.some((member) => member.slug === selectedSlug);
  const activeCrew = hasSelectedSlug ? (selectedSlug as string) : crewMembers[0].slug;
  const activeCrewMember = crewMembers.find((member) => member.slug === activeCrew);

  if (!activeCrewMember) {
    throw new Error("No valid crew member available for rendering.");
  }

  return (
    <main id="main" className="main-container main-container--crew flow">
      <h1 className="numbered-title">
        <span aria-hidden="true">02</span> {safeT("numberedTitle")}
      </h1>

      <CrewDots
        crewMembers={crewMembers.map(({ slug, srLabel }) => ({ slug, srLabel }))}
        initialActiveCrew={activeCrew}
      />

      <article
        className="crew-details flow"
        id={`${activeCrewMember.slug}-tab`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${activeCrewMember.slug}-trigger`}
      >
        <header className="flow flow--space-small">
          <h2 className="fs-600 ff-serif uppercase">{activeCrewMember.role}</h2>
          <p className="fs-700 uppercase ff-serif">{activeCrewMember.name}</p>
        </header>
        <p>{activeCrewMember.description}</p>
      </article>

      <picture id={`${activeCrewMember.slug}-image`}>
        <source srcSet={activeCrewMember.webp} type="image/webp" />
        <img src={activeCrewMember.image} alt={activeCrewMember.alt} />
      </picture>
    </main>
  );
}
