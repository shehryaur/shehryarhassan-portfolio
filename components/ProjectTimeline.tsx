"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Github, Trophy } from "lucide-react";
import { projects, skillGroups } from "@/lib/data";

const byNewest = [...projects].sort((a, b) => b.date.localeCompare(a.date));

export default function ProjectTimeline() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
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

  // A project shows if it uses ANY checked skill; nothing checked shows all.
  const visible = useMemo(
    () =>
      selected.size === 0
        ? byNewest
        : byNewest.filter((p) => p.skills.some((s) => selected.has(s))),
    [selected],
  );

  const toggle = (set: Set<string>, value: string) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  return (
    // md:-mb-14 cancels <main>'s bottom padding so this grid reaches the page
    // bottom; otherwise the sticky filter gets pushed up at full scroll.
    <div className="grid gap-8 md:-mb-14 md:grid-cols-[170px_1fr]">
      {/* ---------- Skills filter (compact rows so it fits without scrolling) ---------- */}
      <aside className="md:sticky md:top-10 md:-ml-14 md:h-fit">
        <div className="flex items-center justify-between">
          <h2 className="text-[12px] font-medium uppercase tracking-wider text-soft">
            Tech stack
          </h2>
          {selected.size > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="text-[12px] text-mute underline underline-offset-2 hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>
        {skillGroups.map((group) => (
          <div key={group.label} className="mt-2.5">
            <h3 className="hand px-2 text-[16px] leading-none text-ink/60">
              {group.label}
            </h3>
            <ul className="mt-0.5 flex flex-wrap gap-1 md:flex-col md:gap-0">
              {group.skills.map((skill) => {
                const checked = selected.has(skill);
                return (
                  <li key={skill}>
                    <label
                      className={`flex items-center gap-2 rounded-md px-2 py-[3px] text-[12.5px] transition-colors max-md:border max-md:border-line ${
                        checked ? "text-ink" : "text-ink/80 hover:bg-subtle"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setSelected((s) => toggle(s, skill))}
                        className="h-3 w-3 accent-ink max-md:hidden"
                      />
                      <span className="flex-1">
                        {/* Checked skills get a highlighter swipe */}
                        <span
                          className={
                            checked ? "marker px-0.5 font-semibold" : ""
                          }
                        >
                          {skill}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>

      {/* ---------- Project list ---------- */}
      <div className="md:pb-14">
        <ul className="divide-y divide-line border-y border-line font-mono">
          {visible.map((p, i) => {
            const expanded = open.has(p.slug);
            return (
              <li
                key={p.slug}
                id={p.slug}
                className="rise scroll-mt-10"
                style={{ ["--i" as string]: i }}
              >
                <button
                  onClick={() => setOpen((s) => toggle(s, p.slug))}
                  aria-expanded={expanded}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-[17px] font-bold text-ink transition-transform duration-300 group-hover:translate-x-1">
                      {p.name}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[13px] text-mute">
                      {p.period} ·
                      {p.award ? (
                        // Awards stand out from plain context lines.
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                          <Trophy size={13} strokeWidth={2.25} />
                          {p.award}
                        </span>
                      ) : (
                        <span>{p.context}</span>
                      )}
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
                      style={{
                        ["--tilt" as string]: i % 2 ? "0.5deg" : "-0.5deg",
                      }}
                    >
                      <p className="text-[12.5px] text-mute">
                        My role: {p.role}
                      </p>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink/85">
                        {p.summary}
                      </p>

                      <ul className="mt-2 space-y-1 text-[13.5px] text-ink/80">
                        {p.results.map((r) => (
                          <li key={r} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="hand mt-4 text-[19px] leading-none text-ink">
                        Problem
                      </h4>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink/80">
                        {p.problem}
                      </p>

                      <h4 className="hand mt-4 text-[19px] leading-none text-ink">
                        What I built
                      </h4>
                      <ul className="mt-1 space-y-1 text-[13.5px] text-ink/80">
                        {p.built.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.skills.map((s) => (
                          <span
                            key={s}
                            className={`chip ${selected.has(s) ? "chip-solid" : ""}`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white hover:opacity-90"
                          >
                            <ExternalLink size={12.5} /> Visit
                          </a>
                        )}
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink hover:bg-subtle"
                          >
                            <Github size={12.5} /> GitHub
                          </a>
                        )}
                      </div>

                      {p.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={`${p.name} screenshot`}
                          className="mt-4 w-full rounded-sm border border-line object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
