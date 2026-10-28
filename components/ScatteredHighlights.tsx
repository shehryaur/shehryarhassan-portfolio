import Link from "next/link";
import { highlights } from "@/lib/highlights";
import AvatarVisionModel from "@/components/AvatarVisionModel";

/**
 * Home hero collage: the round photo with four polaroids taped around it,
 * like a pin board. Sized to sit above the fold (320 x 440).
 * Hover straightens a polaroid and brings it to the front.
 */
type Pin = { key: string; href: string; image: string; alt: string; caption: string; note: string };

/** Adobe lives under Experience, so its polaroid links there. */
const adobe: Pin = {
  key: "adobe",
  href: "/experience",
  image: "/highlight-adobe-ai.jpg",
  alt: "Adobe",
  caption: "Adobe x Minerva",
  note: "AI Product Strategist · 2025-26",
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
  })),
];

// z sets which card overlaps which (the research card sits above the medal so its caption shows)
const placements = [
  { top: 8, left: 0, rotate: "-8deg", tape: "-6deg", z: 2 },
  { top: 196, left: 2, rotate: "5deg", tape: "4deg", z: 3 },
  { top: 236, left: 96, rotate: "-4deg", tape: "-3deg", z: 5 },
  { top: 204, left: 202, rotate: "7deg", tape: "5deg", z: 4 },
];

export default function ScatteredHighlights() {
  return (
    <div className="relative mx-auto h-[440px] w-[320px]">
      {/* Round photo, top right of the board */}
      <div className="absolute right-0 top-0 z-[1]">
        <AvatarVisionModel className="h-[220px] w-[220px]" />
      </div>

      {pins.slice(0, placements.length).map((h, i) => {
        const p = placements[i];
        return (
          <Link
            key={h.key}
            href={h.href}
            style={{ top: p.top, left: p.left, ["--tilt" as string]: p.rotate, zIndex: p.z }}
            className="group absolute w-[118px] rotate-[var(--tilt)] bg-[#fdfcf8] p-2 pb-2.5 shadow-[0_10px_24px_-6px_rgba(30,25,15,0.35),0_2px_4px_rgba(30,25,15,0.12)] transition-transform duration-300 ease-out hover:!z-20 hover:rotate-0 hover:scale-110"
          >
            {/* Tape strip */}
            <span
              aria-hidden="true"
              style={{ transform: `translateX(-50%) rotate(${p.tape})` }}
              className="absolute -top-2.5 left-1/2 h-5 w-14 bg-amber-100/80 shadow-sm"
            />
            {/* Photo */}
            <div className="aspect-square w-full overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.image} alt={h.alt} className="h-full w-full object-contain" />
            </div>
            {/* Caption */}
            <p className="hand mt-1.5 text-center text-[17px] leading-none text-ink">
              {h.caption}
            </p>
            <p className="mt-1 text-center text-[10px] leading-snug text-mute">{h.note}</p>
          </Link>
        );
      })}
    </div>
  );
}
