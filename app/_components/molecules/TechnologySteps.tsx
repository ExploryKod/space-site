"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

type TechnologyStep = {
  slug: string;
  srLabel: string;
};

type TechnologyStepsProps = {
  technologySteps: readonly TechnologyStep[];
  initialActiveTechnology: string;
};

export default function TechnologySteps({
  technologySteps,
  initialActiveTechnology,
}: TechnologyStepsProps) {
  const [activeTechnology, setActiveTechnology] = useState(initialActiveTechnology);
  const [focusedTechnologyStep, setFocusedTechnologyStep] = useState(initialActiveTechnology);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const focusedIndex = technologySteps.findIndex((step) => step.slug === focusedTechnologyStep);

  const selectTechnologyStep = (slug: string) => {
    setActiveTechnology(slug);
    setFocusedTechnologyStep(slug);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("technology", slug);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  const changeDotFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (technologySteps.length === 0) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();

    const currentIndex = focusedIndex < 0 ? 0 : focusedIndex;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + technologySteps.length) % technologySteps.length;

    const nextSlug = technologySteps[nextIndex].slug;
    setFocusedTechnologyStep(nextSlug);
    dotRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      className="step-indicators"
      role="tablist"
      aria-label="technology step list"
      onKeyDown={changeDotFocus}
    >
      {technologySteps.map((step, index) => {
        const isActive = step.slug === activeTechnology;
        const isFocusable = step.slug === focusedTechnologyStep;
        const panelId = `${step.slug}-tab`;

        return (
          <button
            key={step.slug}
            type="button"
            aria-selected={isActive}
            aria-controls={panelId}
            role="tab"
            id={`${step.slug}-trigger`}
            data-image={`${step.slug}-image`}
            tabIndex={isFocusable ? 0 : -1}
            ref={(node) => {
              dotRefs.current[index] = node;
            }}
            onClick={() => selectTechnologyStep(step.slug)}
            onFocus={() => setFocusedTechnologyStep(step.slug)}
          >
            <span className="sr-only">{step.srLabel}</span>
            <p className="step-indicator-number fs-500">{index + 1}</p>
          </button>
        );
      })}
    </div>
  );
}
