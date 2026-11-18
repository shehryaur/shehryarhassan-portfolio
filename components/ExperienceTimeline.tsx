"use client";

import { useEffect, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { experience } from "@/lib/data";

/**
 * Expandable list row pattern matching the Projects and Highlights lists.
 * Replaces the old rail, scroll-tracking beam, and static cards with clean,
 * consistent accordion rows separated by hairline dividers.
 */
export default function ExperienceTimeline() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Open and scroll to the item named in the URL hash (e.g. from Home or external link).
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!slug || !document.getElementById(slug)) return;
      setOpen((s) => new Set(s).add(slug));
      window.setTimeout(
        () =>
          document
            .getElementById(slug)
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80
      );
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggle = (slug: string) => {
    setOpen((s) => {
      const next = new Set(s);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  return (
    <ul className="divide-y divide-line border-y border-line">
      {experience.map((e, i) => {
        const slug = e.slug || e.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const expanded = open.has(slug);

        return (
          <li
            key={slug}
            id={slug}
            className="rise scroll-mt-10"
            style={{ ["--i" as string]: i }}
          >
            <button
              onClick={() => toggle(slug)}
              aria-expanded={expanded}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <div className="min-w-0">
                <span className="block text-[17px] font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {e.company}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px] text-mute">
                  <span className="font-mono text-[12.5px] text-mute">
                    {e.period}
                  </span>{" "}
                  · <span>{e.role}</span>
                </span>
              </div>
              <ArrowRight
                size={18}
                aria-label={expanded ? "Hide details" : "Show details"}
                className={`shrink-0 text-mute transition-transform group-hover:text-ink ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </button>

            {expanded && (
              <div className="pb-7 pt-1">
                <div className="unfold rounded-lg border border-line bg-surface p-6 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-mute">
                    <span>{e.about}</span>
                    {e.location && (
                      <span className="font-mono text-[12px]">{e.location}</span>
                    )}
                  </div>

                  <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink/80">
                    {e.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>

                  {e.links && e.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink hover:bg-subtle"
                        >
                          <FileText size={12.5} /> {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
