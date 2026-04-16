import Tab from "@/app/_components/atomes/Tab";

type DestinationTabItem = {
  slug: string;
  name: string;
};

type DestinationTabsProps = {
  destinations: readonly DestinationTabItem[];
  activeDestination: string;
}

export default function DestinationTabs({ destinations, activeDestination }: DestinationTabsProps) {
  return (
    <div
      className="tab-list underline-indicators flex"
      role="tablist"
      aria-label="destination list"
    >
      {destinations.map((destination) => {
        const isActive = destination.slug === activeDestination;
        const pictureId = `${destination.slug}-image`;
        const tabId = `${destination.slug}-tab`;

        return (
          <Tab
            key={destination.slug}
            slug={destination.slug}
            isActive={isActive}
            tabId={tabId}
            pictureId={pictureId}
          >
            {destination.name}
          </Tab>
        );
      })}
    </div>
  );
}