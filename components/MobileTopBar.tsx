"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function MobileTopBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/90 px-4 py-2.5 backdrop-blur md:hidden">
      <nav className="flex gap-1 overflow-x-auto">
        {nav.map((n) => {
          const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active ? "bg-ink text-white" : "text-ink/80 hover:bg-subtle"
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
