"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Navigation,
  BarChart3,
  Mail,
  Linkedin,
  Github,
  Instagram,
  Star,
} from "lucide-react";
import { site } from "@/lib/data";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Navigation },
  { href: "/highlights", label: "Highlights", icon: Star },
  { href: "/experience", label: "Experience", icon: BarChart3 },
  { href: "/contact", label: "Contact", icon: Mail },
];

const connect = [
  { href: site.socials.email, label: "Email", icon: Mail },
  { href: site.socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.socials.github, label: "GitHub", icon: Github },
  { href: site.socials.instagram, label: "Instagram", icon: Instagram },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[300px] flex-col border-r border-line bg-page/80 px-5 py-7 backdrop-blur-sm md:flex">
      {/* Profile */}
      <div className="mb-7 flex min-h-14 items-center gap-4 px-2">
        {/* Home already shows the big photo, so the small one hides there */}
        {pathname !== "/" && (
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-subtle ring-1 ring-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.avatar}
              alt={site.fullName}
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] transition-colors ${
                  active ? "bg-ink text-white" : "text-ink/85 hover:bg-subtle"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.25 : 1.75} />
                <span>{item.label}</span>
              </Link>
            </div>
          );
        })}

        {/* Connect */}
        <div className="mt-7">
          <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-soft">
            Connect
          </div>
          <div className="flex flex-col gap-0.5">
            {connect.map((item) => {
              const Icon = item.icon;
              const external = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] text-ink/80 hover:bg-subtle"
                >
                  <Icon size={16} strokeWidth={1.75} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
