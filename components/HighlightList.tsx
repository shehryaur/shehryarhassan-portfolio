"use client";

import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { highlights } from "@/lib/highlights";

/** Same row + "→" expand pattern as the Projects list, without images. */
export default function HighlightList() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (slug: string) =>
    setOpen((s) => {
      const next = new Set(s);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  return (
    <ul className="divide-y divide-line border-y border-line font-mono">
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
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="min-w-0">
                <span className="block text-[17px] font-bold text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {h.title}
                </span>
                <span className="mt-1 block text-[13px] text-mute">
                  {h.context}
                </span>
              </span>
              <ArrowRight
                size={18}
                aria-label={expanded ? "Hide details" : "Show details"}
                className={`shrink-0 text-mute transition-transform group-hover:text-ink ${expanded ? "rotate-90" : ""}`}
              />
            </button>

            {expanded && (
              <div className="pb-7 pt-1">
                {/* Details open as a taped paper note with a slight tilt */}
                <div
                  className="unfold paper tape tilt rounded-sm px-5 pb-5 pt-6 font-sans"
                  style={{ ["--tilt" as string]: i % 2 ? "0.5deg" : "-0.5deg" }}
                >
                  <p className="text-[14px] leading-relaxed text-ink/85">
                    {h.summary}
                  </p>
                  <ul className="mt-3 space-y-1 text-[13.5px] text-ink/80">
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
