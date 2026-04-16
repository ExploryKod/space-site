"use client";

import Tab from "@/app/_components/atomes/Tab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

type DestinationData = {
  slug: string;
  name: string;
};

type DestinationTabsProps = {
  destinations: readonly DestinationData[];
  initialActiveDestination: string;
};

export default function DestinationTabs({
  destinations,
  initialActiveDestination,
}: DestinationTabsProps) {
  const [activeDestination, setActiveDestination] = useState(initialActiveDestination);
  const [focusedDestination, setFocusedDestination] = useState(initialActiveDestination);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focusedIndex = destinations.findIndex((item) => item.slug === focusedDestination);

  const selectDestination = (slug: string) => {
    setActiveDestination(slug);
    setFocusedDestination(slug);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("destination", slug);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const changeTabFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (destinations.length === 0) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();

    const currentIndex = focusedIndex < 0 ? 0 : focusedIndex;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + destinations.length) % destinations.length;

    const nextSlug = destinations[nextIndex].slug;
    setFocusedDestination(nextSlug);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      className="tab-list underline-indicators flex"
      role="tablist"
      aria-label="destination list"
      onKeyDown={changeTabFocus}
    >
      {destinations.map((destination, index) => {
        const isActive = destination.slug === activeDestination;
        const isFocusable = destination.slug === focusedDestination;
        const pictureId = `${destination.slug}-image`;
        const tabId = `${destination.slug}-tab`;

        return (
          <Tab
            key={destination.slug}
            slug={destination.slug}
            isActive={isActive}
            isFocusable={isFocusable}
            tabId={tabId}
            pictureId={pictureId}
            onClick={() => {
              selectDestination(destination.slug);
            }}
            onFocus={() => setFocusedDestination(destination.slug)}
            buttonRef={(node) => {
              tabRefs.current[index] = node;
            }}
          >
            {destination.name}
          </Tab>
        );
      })}
    </div>
  );
}