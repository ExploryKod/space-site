import Image from "next/image";
import { MobileNav } from "./MobileNav";

export function SpHeader() {
  const links = [
    { href: "/", number: "00", label: "Home" },
    { href: "/destination", number: "01", label: "Destination" },
    { href: "/crew", number: "02", label: "Crew" },
    { href: "/technology", number: "03", label: "Technology" },
  ];

  return (
    <header className="primary-header flex justify-between items-center z-10">
      <div className="logo-wrapper">
        <Image
          src="/shared/logo.svg"
          alt="space tourism logo"
          className="h-auto w-auto logo"
          width={100}
          height={100}
        />
      </div>

      <MobileNav links={links} />
    </header>
  );
}