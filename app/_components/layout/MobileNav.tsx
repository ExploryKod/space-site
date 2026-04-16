"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  number: string;
  label: string;
};

export function MobileNav({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /* Close menu when route changes */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* Lock page scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">Menu</span>
      </button>

      <nav className="header-nav">
        <ul
          id="primary-navigation"
          data-visible={isOpen}
          className="primary-navigation underline-indicators"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} data-active={isActive}>
                <Link
                  href={link.href}
                  className="font-bold [font-family:var(--ff-sans-cond)] uppercase tracking-[2.7px] text-white no-underline"
                >
                  <span className="mr-2 font-bold">{link.number}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}