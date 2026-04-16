import CrewDots from "@/app/_components/molecules/CrewDots";

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

const crewMembers: CrewMember[] = [
  {
    slug: "commander",
    srLabel: "The commander",
    role: "Commander",
    name: "Douglas Hurley",
    description:
      "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    image: "/crew/image-douglas-hurley.png",
    webp: "/crew/image-douglas-hurley.webp",
    alt: "Douglas Hurley",
  },
  {
    slug: "mission-specialist",
    srLabel: "The mission specialist",
    role: "Mission Specialist",
    name: "Mark Shuttleworth",
    description:
      "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    image: "/crew/image-mark-shuttleworth.png",
    webp: "/crew/image-mark-shuttleworth.webp",
    alt: "Mark Shuttleworth",
  },
  {
    slug: "pilot",
    srLabel: "The pilot",
    role: "Pilot",
    name: "Victor Glover",
    description:
      "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.",
    image: "/crew/image-victor-glover.png",
    webp: "/crew/image-victor-glover.webp",
    alt: "Victor Glover",
  },
  {
    slug: "engineer",
    srLabel: "The flight engineer",
    role: "Flight Engineer",
    name: "Anousheh Ansari",
    description:
      "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
    image: "/crew/image-anousheh-ansari.png",
    webp: "/crew/image-anousheh-ansari.webp",
    alt: "Anousheh Ansari",
  },
];

export default async function Crew({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

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
        <span aria-hidden="true">02</span> Meet your crew
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
