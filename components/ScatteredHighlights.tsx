"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { highlights } from "@/lib/highlights";
import AvatarVisionModel from "@/components/AvatarVisionModel";

/**
 * Home hero collage: the round photo with four square polaroids taped around
 * it, like a pin board. Sized to sit above the fold (320 x 460).
 * Hover straightens a polaroid and brings it to the front.
 */
type Pin = {
  key: string;
  href: string;
  image: string;
  alt: string;
  caption: string;
  note: string;
  say: string; // what the Home robot says when it bumps into this polaroid
};

/** Robot lines for the highlight polaroids, by highlight slug. */
const robotLines: Record<string, string> = {
  "ar-razzaq-foundation": "He co-founded a non-profit. PKR 2M+ raised!",
  "lead-academic-researcher": "A published researcher, too? Nice.",
  "national-academic-gold-medal": "Top of the whole province. Gold medal!",
};

/** Adobe lives under Experience, so its polaroid links there. */
const adobe: Pin = {
  key: "adobe",
  href: "/experience",
  image: "/highlight-adobe-ai.jpg",
  alt: "Adobe",
  caption: "Adobe x Minerva",
  note: "AI Product Strategist · 2025-26",
  say: "Worked with a Product Manager at Adobe, wow!",
};

const pins: Pin[] = [
  adobe,
  ...highlights.map((h) => ({
    key: h.slug,
    href: `/highlights#${h.slug}`,
    image: h.image,
    alt: h.title,
    caption: h.shortTitle,
    note: h.context,
    say: robotLines[h.slug] ?? h.context,
  })),
];

// Order matches pins: Adobe and the medal pinned to the photo's lower corners,
// Ar-Razzaq and the research paper in a loose row underneath.
const placements = [
  { top: 168, left: 0, rotate: "-6deg", tape: "-5deg", z: 3 },
  { top: 318, left: 30, rotate: "4deg", tape: "3deg", z: 2 },
  { top: 330, left: 172, rotate: "-5deg", tape: "-4deg", z: 2 },
  { top: 182, left: 200, rotate: "6deg", tape: "5deg", z: 3 },
];

export default function ScatteredHighlights() {
  // The Home robot asks a polaroid to lift (it ducks behind it) via a window event.
  const [lifted, setLifted] = useState<string | null>(null);
  useEffect(() => {
    const onLift = (e: Event) => {
      const { key, up } = (e as CustomEvent<{ key: string; up: boolean }>).detail;
      setLifted(up ? key : null);
    };
    window.addEventListener("bot:lift", onLift);
    return () => window.removeEventListener("bot:lift", onLift);
  }, []);

  return (
    <div className="relative mx-auto h-[460px] w-[320px]">
      {/* Round photo, centred at the top of the board */}
      <div className="absolute left-[50px] top-0 z-[1] rounded-full" data-bot-say="Looking sharp in that suit!">
        <AvatarVisionModel className="h-[220px] w-[220px]" />
      </div>

      {pins.slice(0, placements.length).map((h, i) => {
        const p = placements[i];
        return (
          <Link
            key={h.key}
            href={h.href}
            title={h.note}
            data-bot-say={h.say}
            data-bot-act={h.key === "adobe" ? "lift" : undefined}
            data-pin-key={h.key}
            data-lifted={lifted === h.key ? "true" : undefined}
            style={{ top: p.top, left: p.left, ["--tilt" as string]: p.rotate, zIndex: p.z }}
            className="polaroid group absolute flex h-[118px] w-[118px] rotate-[var(--tilt)] flex-col bg-[#fdfcf8] p-1.5 shadow-[0_10px_24px_-6px_rgba(30,25,15,0.35),0_2px_4px_rgba(30,25,15,0.12)] transition-transform duration-300 ease-out hover:!z-20 hover:rotate-0 hover:scale-110"
          >
            {/* Tape strip */}
            <span
              aria-hidden="true"
              style={{ transform: `translateX(-50%) rotate(${p.tape})` }}
              className="absolute -top-2.5 left-1/2 h-5 w-14 bg-amber-100/80 shadow-sm"
            />
            {/* Photo */}
            <div className="min-h-0 w-full flex-1 overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.image} alt={h.alt} className="h-full w-full object-contain" />
            </div>
            {/* Caption */}
            <p className="hand mt-1 truncate text-center text-[16px] leading-tight text-ink">
              {h.caption}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
