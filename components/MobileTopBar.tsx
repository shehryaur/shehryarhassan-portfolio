"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/data";
import Typewriter from "@/components/Typewriter";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/highlights", label: "Highlights" },
  { href: "/experience", label: "Experience" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileTopBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/90 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-subtle ring-1 ring-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.avatar}
            alt={site.fullName}
            className="h-full w-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.src = "https://api.dicebear.com/9.x/notionists/svg?seed=shehryar&backgroundColor=e8d5b7";
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-tight text-ink">{site.name}</div>
          <div className="text-[11px] text-mute">
            <Typewriter words={site.roles} />
          </div>
        </div>
      </div>
      <nav className="mt-3 -mx-1 flex gap-1 overflow-x-auto pb-1">
        {nav.map((n) => {
          const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`shrink-0 rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors ${
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
