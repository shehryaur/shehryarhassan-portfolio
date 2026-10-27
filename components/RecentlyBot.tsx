"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";

/** What the bot says once caught; each item links to its project. */
const recently = [
  { text: "1st place, Google x k-ID Hackathon", href: "/projects#curio" },
  { text: "Winner, SF Hacks x GDG Hackathon at SFSU", href: "/projects#planed" },
];

/** Teasing lines it cycles through while wandering. */
const taunts = ["Catch me!", "Over here!", "Too slow!"];

/** Where the bot rests once caught (the note opens to its right). */
const HOME = { left: "0%", top: "34%" };

/**
 * Paper-cutout robot drawn in the site's paper palette. Parts carry class
 * names that globals.css animates (walk, blink, antenna bob, wave).
 */
function PaperBot({ caught }: { caught: boolean }) {
  const ink = "#0a0a0a";
  const paper = "#fdfcf8";
  return (
    <svg viewBox="0 0 64 76" width="56" height="66" aria-hidden="true" className="overflow-visible">
      {/* Antenna with an amber light */}
      <g className="bot-antenna">
        <line x1="32" y1="15" x2="32" y2="7" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="5" r="3.5" fill="#f59e0b" stroke={ink} strokeWidth="1.5" />
      </g>

      {/* Arms: hang down while wandering, wave up when caught */}
      <g className={caught ? "bot-arm-wave-l" : ""}>
        <path d="M18 50 Q10 54 9 61" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className={caught ? "bot-arm-wave-r" : ""}>
        <path d="M46 50 Q54 54 55 61" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Legs: alternate while walking */}
      <rect className={caught ? "" : "bot-leg-l"} x="23" y="60" width="6" height="11" rx="2.5" fill={paper} stroke={ink} strokeWidth="2" />
      <rect className={caught ? "" : "bot-leg-r"} x="35" y="60" width="6" height="11" rx="2.5" fill={paper} stroke={ink} strokeWidth="2" />

      {/* Body with a small control panel */}
      <rect x="17" y="44" width="30" height="18" rx="6" fill={paper} stroke={ink} strokeWidth="2" />
      <circle cx="27" cy="53" r="2" fill="#f59e0b" />
      <rect x="32" y="51.5" width="9" height="3" rx="1.5" fill={ink} opacity="0.25" />

      {/* Head */}
      <rect x="9" y="15" width="46" height="30" rx="9" fill={paper} stroke={ink} strokeWidth="2" />
      {/* Strip of tape across the head, like the polaroids */}
      <rect x="35" y="11" width="18" height="7" rx="1" fill="rgba(254,243,199,0.95)" transform="rotate(14 44 14)" />
      {/* Face screen */}
      <rect x="15" y="21" width="34" height="18" rx="6" fill={ink} />
      {caught ? (
        // Happy eyes once caught
        <g fill="none" stroke="#fde68a" strokeWidth="2.2" strokeLinecap="round">
          <path d="M21 31 Q25 26 29 31" />
          <path d="M35 31 Q39 26 43 31" />
        </g>
      ) : (
        <g className="bot-eyes" fill="#fde68a">
          <rect x="21.5" y="26" width="6" height="7" rx="3" />
          <rect x="36.5" y="26" width="6" height="7" rx="3" />
        </g>
      )}
    </svg>
  );
}

/**
 * A paper robot that wanders around a box teasing "Catch me!". Clicking it
 * freezes it, glides it home, and opens a taped note with recent wins.
 */
export default function RecentlyBot() {
  const botRef = useRef<HTMLButtonElement | null>(null);
  const [caught, setCaught] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [taunt, setTaunt] = useState(0);
  const [pos, setPos] = useState<{ left: string; top: string } | null>(null);

  // Rotate the teasing line while it wanders.
  useEffect(() => {
    if (caught) return;
    const id = window.setInterval(() => setTaunt((t) => (t + 1) % taunts.length), 2800);
    return () => window.clearInterval(id);
  }, [caught]);

  const catchBot = () => {
    const bot = botRef.current;
    if (!bot || caught) return;
    // Freeze at the current animated spot, then glide home a moment later
    // (a short timer rather than rAF, so it also runs in background tabs).
    const { left, top } = getComputedStyle(bot);
    setPos({ left, top });
    setCaught(true);
    window.setTimeout(() => setPos(HOME), 30);
  };

  const release = () => {
    setCaught(false);
    setPos(null);
  };

  return (
    <div className="relative mt-8 h-48 w-full max-w-md">
      <button
        ref={botRef}
        type="button"
        onClick={catchBot}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={caught ? "Robot caught" : "Catch the robot to see what I've been up to"}
        style={pos ?? undefined}
        className={`absolute z-10 transition-[left,top] duration-500 ease-out ${caught ? "" : "bot-wander"}`}
      >
        {/* Faces the way it walks (flips with the wander path) */}
        <span className={`block ${caught ? "" : "bot-face"}`}>
          <span className={`block drop-shadow-[0_6px_6px_rgba(30,25,15,0.28)] ${hovered && !caught ? "bot-wiggle" : ""}`}>
            <PaperBot caught={caught} />
          </span>
        </span>

        {/* Paper speech bubble while wandering */}
        {!caught && (
          <span className="hand pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#fdfcf8] px-2.5 py-0.5 text-[17px] leading-tight text-ink shadow-[0_4px_10px_-3px_rgba(30,25,15,0.3)]">
            {hovered ? "Eek!" : taunts[taunt]}
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#fdfcf8]" aria-hidden="true" />
          </span>
        )}
      </button>

      {/* Caught: a taped paper note to the right of the bot */}
      {caught && (
        <div
          role="status"
          className="unfold paper tape absolute left-[72px] top-[14%] z-20 w-[min(270px,calc(100%-80px))] rounded-sm px-4 pb-3.5 pt-5"
          style={{ ["--tilt" as string]: "-1deg" }}
        >
          <p className="hand text-[22px] leading-none text-ink">You caught me!</p>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-soft">Recently</p>
          <ul className="mt-1.5 space-y-1.5 text-[13.5px] text-ink/85">
            {recently.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="flex items-start gap-2 hover:underline">
                  <Trophy size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-amber-700" />
                  {r.text}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={release}
            className="hand mt-2.5 text-[17px] leading-none text-mute hover:text-ink"
          >
            Let me go →
          </button>
        </div>
      )}
    </div>
  );
}
