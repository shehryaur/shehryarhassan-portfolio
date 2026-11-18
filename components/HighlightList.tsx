"use client";

import { useEffect, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { highlights } from "@/lib/highlights";

/** Same row + "→" expand pattern as the Projects list, with logo on the left. */
export default function HighlightList() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Open and scroll to the item named in the URL hash (e.g. from a Home polaroid).
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!slug || !document.getElementById(slug)) return;
      setOpen((s) => new Set(s).add(slug));
      window.setTimeout(() => document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggle = (slug: string) =>
    setOpen((s) => {
      const next = new Set(s);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  return (
    <ul className="divide-y divide-line border-y border-line">
      {highlights.map((h, i) => {
        const expanded = open.has(h.slug);
        return (
          <li
            key={h.slug}
            id={h.slug}
            className="rise scroll-mt-10"
            style={{ ["--i" as string]: i }}
          >
            <button
              onClick={() => toggle(h.slug)}
              aria-expanded={expanded}
              className="group flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {h.image && (
                  <div className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={h.image}
                      alt={`${h.title} logo`}
                      className="max-h-full max-w-full object-contain rounded-md mix-blend-multiply"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <span className="block text-[17px] font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1">
                    {h.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-mute">
                    {h.context}
                  </span>
                </div>
              </div>
              <ArrowRight
                size={18}
                aria-label={expanded ? "Hide details" : "Show details"}
                className={`shrink-0 text-mute transition-transform group-hover:text-ink ${expanded ? "rotate-90" : ""}`}
              />
            </button>

            {expanded && (
              <div className="pb-7 pt-1">
                <div className="unfold rounded-lg border border-line bg-surface p-6 shadow-xs">
                  <p className="text-[14px] leading-relaxed text-ink/85">
                    {h.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink/80">
                    {h.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {h.pdfs && h.pdfs.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {h.pdfs.map((pdf) => (
                        <a
                          key={pdf.href}
                          href={pdf.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink hover:bg-subtle"
                        >
                          <FileText size={12.5} /> {pdf.title}
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
