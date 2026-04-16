"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

type CrewMember = {
  slug: string;
  srLabel: string;
};

type CrewDotsProps = {
  crewMembers: readonly CrewMember[];
  initialActiveCrew: string;
};

export default function CrewDots({
  crewMembers,
  initialActiveCrew,
}: CrewDotsProps) {
  const [activeCrew, setActiveCrew] = useState(initialActiveCrew);
  const [focusedCrew, setFocusedCrew] = useState(initialActiveCrew);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focusedIndex = crewMembers.findIndex((member) => member.slug === focusedCrew);

  const selectCrew = (slug: string) => {
    setActiveCrew(slug);
    setFocusedCrew(slug);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("crew", slug);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const changeDotFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (crewMembers.length === 0) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();

    const currentIndex = focusedIndex < 0 ? 0 : focusedIndex;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + crewMembers.length) % crewMembers.length;

    const nextSlug = crewMembers[nextIndex].slug;
    setFocusedCrew(nextSlug);
    dotRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      className="dot-indicators flex"
      role="tablist"
      aria-label="crew member list"
      onKeyDown={changeDotFocus}
    >
      {crewMembers.map((member, index) => {
        const isActive = member.slug === activeCrew;
        const isFocusable = member.slug === focusedCrew;
        const panelId = `${member.slug}-tab`;

        return (
          <button
            key={member.slug}
            type="button"
            aria-selected={isActive}
            aria-controls={panelId}
            role="tab"
            id={`${member.slug}-trigger`}
            data-image={`${member.slug}-image`}
            tabIndex={isFocusable ? 0 : -1}
            ref={(node) => {
              dotRefs.current[index] = node;
            }}
            onClick={() => selectCrew(member.slug)}
            onFocus={() => setFocusedCrew(member.slug)}
          >
            <span className="sr-only">{member.srLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
