"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { experience } from "@/lib/data";

/**
 * Timeline with a minimalist black "scroll beam".
 *
 * Key layout choices that fix the overlap seen in the previous version:
 *  - Two-column grid becomes wider (170px date column, then 24px rail column,
 *    then the body). The rail lives in its own column so it can never
 *    overlap the date text.
 *  - `md:pl-6` was removed from the outer wrapper — the rail is now positioned
 *    against the middle grid column instead of a fragile absolute offset.
 *  - Beam is a subtle dark gradient (not neon blue) and does not pulse.
 */
export default function ExperienceTimeline() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [beamHeight, setBeamHeight] = useState(0);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;

      // Anchor the beam tip to ~55% of the viewport as the user scrolls.
      const anchor = viewportH * 0.55;
      const traveled = Math.min(Math.max(anchor - rect.top, 0), rect.height);

      setBeamHeight(traveled);
      setVisible(rect.top < viewportH && rect.bottom > 0);

      let idx = -1;
      rowRefs.current.forEach((el, i) => {
        if (!el || !wrap) return;
        const elTop = el.getBoundingClientRect().top - rect.top;
        if (traveled >= elTop + 8) idx = i;
      });
      setActiveIdx(idx);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div className="space-y-14">
        {experience.map((e, i) => (
          <div
            key={i}
            id={e.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="rise grid grid-cols-1 gap-4 md:grid-cols-[170px_24px_1fr] md:gap-6"
            style={{ ["--i" as string]: i }}
          >
            {/* Date column */}
            <div className="md:pt-1 md:text-right">
              <div className="hand text-[19px] leading-tight text-ink/70">
                {e.period}
              </div>
              <div className="mt-0.5 text-[12px] leading-snug text-soft">
                {e.location}
              </div>
            </div>

            {/* Rail column — contains rail, beam, and the dot for this row. */}
            <div className="relative hidden md:block">
              {/* Rail: only paint it once (on the first row) so the beam can
                  render continuously across all rows. */}
              {i === 0 && (
                <>
                  <div
                    className="timeline-rail"
                    style={{
                      // Extend from this row down through all following rows.
                      // The wrapper has `space-y-14` (56px) between rows.
                      height: "calc(100% + 100vh)",
                    }}
                  />
                  <div
                    className="timeline-beam"
                    style={{
                      height: `${beamHeight}px`,
                      opacity: visible ? 1 : 0,
                    }}
                  />
                </>
              )}
              <span
                className={`timeline-dot ${activeIdx >= i ? "active" : ""}`}
              />
            </div>

            {/* Body: a taped paper card, alternating tilt, straightens on hover */}
            <div
              className="paper tape tilt rounded-sm px-5 pb-5 pt-6"
              style={{ ["--tilt" as string]: i % 2 ? "0.6deg" : "-0.6deg" }}
            >
              <h3 className="text-[17px] font-semibold text-ink">
                {e.role}{" "}
                <span className="text-mute">· {e.company}</span>
              </h3>
              <p className="mt-0.5 text-[12.5px] text-mute">{e.about}</p>
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
              {e.links && (
                <div className="mt-3 flex flex-wrap gap-2">
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
        ))}
      </div>
    </div>
  );
}
