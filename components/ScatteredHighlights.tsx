import Link from "next/link";
import { highlights } from "@/lib/highlights";
import AvatarVisionModel from "@/components/AvatarVisionModel";

/**
 * Home hero collage: the round photo with three highlight polaroids taped
 * around it, like a pin board. Sized to sit above the fold (320 x 470).
 * Hover straightens a polaroid and brings it to the front.
 */
const placements = [
  { top: 24, left: 0, rotate: "-9deg", tape: "-6deg" },
  { top: 236, left: 14, rotate: "6deg", tape: "4deg" },
  { top: 258, left: 178, rotate: "-5deg", tape: "-3deg" },
];

export default function ScatteredHighlights() {
  return (
    <div className="relative mx-auto h-[470px] w-[320px]">
      {/* Round photo, top right of the board */}
      <div className="absolute right-0 top-0 z-[1]">
        <AvatarVisionModel className="h-[220px] w-[220px]" />
      </div>

      {highlights.slice(0, placements.length).map((h, i) => {
        const p = placements[i];
        return (
          <Link
            key={h.slug}
            href={`/highlights#${h.slug}`}
            style={{ top: p.top, left: p.left, ["--tilt" as string]: p.rotate, zIndex: 2 + i }}
            className="group absolute w-[130px] rotate-[var(--tilt)] bg-[#fdfcf8] p-2 pb-2.5 shadow-[0_10px_24px_-6px_rgba(30,25,15,0.35),0_2px_4px_rgba(30,25,15,0.12)] transition-transform duration-300 ease-out hover:!z-20 hover:rotate-0 hover:scale-110"
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
              <img src={h.image} alt={h.title} className="h-full w-full object-contain" />
            </div>
            {/* Caption */}
            <p className="hand mt-1.5 text-center text-[17px] leading-none text-ink">
              {h.shortTitle}
            </p>
            <p className="mt-1 text-center text-[10px] leading-snug text-mute">{h.context}</p>
          </Link>
        );
      })}
    </div>
  );
}
