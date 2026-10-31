"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";

/** What the bot says once caught; each item links to its project. */
const recently = [
  { text: "1st place, Google x k-ID Hackathon", href: "/projects#curio" },
  { text: "Winner, SF Hacks x GDG Hackathon at SFSU", href: "/projects#planed" },
];

const BOT_W = 56;
const BOT_H = 66;
/** It trails the cursor from just below-right, so it never sits under it. */
const FOLLOW_OFFSET = { x: 34, y: 26 };
/** Top walking speed (px/s) and how quickly its velocity catches up (per second). */
const MAX_SPEED = 170;
const ACCEL = 6;
/** A bumped obstacle can't trigger again for this long. */
const COOLDOWN_MS = 9000;
/** Dozes off after the mouse has been still this long. */
const NAP_AFTER_MS = 8000;

/** Tips it gives when you hover the sidebar links. */
const navTips: Record<string, string> = {
  "/": "You're already home!",
  "/projects": "Try the Go filter on Projects!",
  "/highlights": "A non-profit, a paper, a gold medal.",
  "/experience": "Adobe, Blackmont, Skill Craft. Busy guy!",
  "/contact": "He reads every note. Say hi!",
};

/**
 * Paper-cutout robot drawn in the site's paper palette. Parts carry class
 * names that globals.css animates (walk, blink, antenna bob, wave).
 */
function PaperBot({ happy, sleepy }: { happy: boolean; sleepy: boolean }) {
  // Warm pencil-ink outlines, to match the handwriting and paper on the site
  const ink = "#2b2622";
  const paper = "#fdfcf8";
  return (
    <svg viewBox="0 0 64 76" width={BOT_W} height={BOT_H} aria-hidden="true" className="overflow-visible">
      {/* Antenna with an amber light */}
      <g className="bot-antenna">
        <line x1="32" y1="15" x2="32" y2="7" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="5" r="3.5" fill="#f59e0b" stroke={ink} strokeWidth="1.5" />
      </g>

      {/* Arms: hang down normally, wave up when happy */}
      <g className={happy ? "bot-arm-wave-l" : ""}>
        <path d="M18 50 Q10 54 9 61" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className={happy ? "bot-arm-wave-r" : ""}>
        <path d="M46 50 Q54 54 55 61" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Legs: alternate while walking (paused when standing, see globals.css) */}
      <rect className="bot-leg-l" x="23" y="60" width="6" height="11" rx="2.5" fill={paper} stroke={ink} strokeWidth="2" />
      <rect className="bot-leg-r" x="35" y="60" width="6" height="11" rx="2.5" fill={paper} stroke={ink} strokeWidth="2" />

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
      {sleepy ? (
        // Closed eyes while napping
        <g fill="none" stroke="#fde68a" strokeWidth="2.2" strokeLinecap="round">
          <path d="M21 30 Q25 33 29 30" />
          <path d="M35 30 Q39 33 43 30" />
        </g>
      ) : happy ? (
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

/** Taped paper note listing recent wins (opened by clicking the bot). */
function RecentNote({ onClose }: { onClose: () => void }) {
  return (
    <div role="status" className="unfold paper tape w-[260px] rounded-sm px-4 pb-3.5 pt-5" style={{ ["--tilt" as string]: "-1deg" }}>
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
      <button type="button" onClick={onClose} className="hand mt-2.5 text-[17px] leading-none text-mute hover:text-ink">
        Let me go →
      </button>
    </div>
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Home robot. On desktop it slowly follows the cursor; when it walks into an
 * element marked `data-bot-say`, it jumps and says that line. An element
 * with `data-bot-act="lift"` gets a stunt: the bot strikes it, falls, the
 * polaroid lifts, the bot slips behind and pops out the other side. One with
 * `data-bot-act="climb"` gets it stuck, so it throws a rope, climbs on top
 * and says its line from up there. It naps when the mouse is still, and
 * gives tips when you hover the sidebar links.
 * Clicking the bot opens a note with recent wins. On touch screens or with
 * reduced motion it stays put in its spot.
 */
export default function RecentlyBot() {
  const spotRef = useRef<HTMLDivElement | null>(null);
  const botRef = useRef<HTMLDivElement | null>(null);
  const [follow, setFollow] = useState(false);
  const [caught, setCaught] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [anim, setAnim] = useState<string>("");
  const [noteOnLeft, setNoteOnLeft] = useState(false);
  const [rope, setRope] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  // Live state for the movement loop (refs, so it never re-renders per frame).
  const pos = useRef({ x: 0, y: 0 });
  const cursor = useRef<{ x: number; y: number } | null>(null);
  const busy = useRef(false);
  const caughtRef = useRef(false);
  const cooldowns = useRef(new Map<Element, number>());
  const lastMove = useRef(Date.now());
  const napping = useRef(false);
  const graceUntil = useRef(0);

  // Follow only with a mouse and when motion is welcome.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFollow(fine && !calm && window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    caughtRef.current = caught;
  }, [caught]);

  useEffect(() => {
    if (!follow) return;
    const bot = botRef.current;
    const spot = spotRef.current;
    if (!bot || !spot) return;

    // Start where the bot would normally stand.
    const r = spot.getBoundingClientRect();
    pos.current = { x: r.left, y: r.top };

    const place = () => {
      bot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };
    place();

    const say = (line: string, ms: number) => {
      setMessage(line);
      window.setTimeout(() => setMessage((m) => (m === line ? null : m)), ms);
    };

    const onMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
      lastMove.current = Date.now();
      if (napping.current) {
        napping.current = false;
        graceUntil.current = Date.now() + 1800;
        setAnim("");
        say("Oh! I'm up!", 1500);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Sidebar tips on hover (rate-limited, never interrupts a stunt).
    let lastTip = 0;
    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("aside a[href^='/']");
      const tip = a ? navTips[a.getAttribute("href") ?? ""] : undefined;
      if (!tip || busy.current || napping.current || Date.now() - lastTip < 4000) return;
      lastTip = Date.now();
      say(tip, 2400);
    };
    document.addEventListener("mouseover", onOver);

    const clamp = (x: number, y: number) => {
      const minX = window.innerWidth >= 768 ? 308 : 8; // stay right of the sidebar
      return {
        x: Math.min(Math.max(x, minX), window.innerWidth - BOT_W - 8),
        y: Math.min(Math.max(y, 8), window.innerHeight - BOT_H - 8),
      };
    };

    let movingNow = false;
    let faceNow = 1;
    const setMoving = (moving: boolean, dir?: number) => {
      if (moving !== movingNow) {
        movingNow = moving;
        bot.dataset.moving = moving ? "true" : "false";
      }
      if (dir && dir !== faceNow) {
        faceNow = dir;
        bot.style.setProperty("--face", String(dir));
      }
    };

    // Text and the photo: no collision, it just comments as it walks past.
    const bump = (_el: HTMLElement, line: string) => {
      say(line, 2600);
    };

    // Adobe stunt: strike, fall, the polaroid lifts, slip behind, pop out the other side.
    const stunt = async (el: HTMLElement, line: string) => {
      busy.current = true;
      setMoving(false);
      const key = el.dataset.pinKey;
      setAnim("bump");
      setMessage("Oof!");
      await wait(500);
      setAnim("fall");
      setMessage(null);
      await wait(650);
      window.dispatchEvent(new CustomEvent("bot:lift", { detail: { key, up: true } }));
      setAnim("hidden");
      await wait(450);
      // Reappear on the far side of the polaroid from where it hit.
      const t = el.getBoundingClientRect();
      const hitFromLeft = pos.current.x + BOT_W / 2 < t.left + t.width / 2;
      const target = clamp(hitFromLeft ? t.right + 6 : t.left - BOT_W - 6, t.top + t.height / 2 - BOT_H / 2);
      pos.current = target;
      bot.style.setProperty("--face", hitFromLeft ? "-1" : "1");
      place();
      setAnim("peek");
      setMessage(line);
      await wait(700);
      setAnim("");
      await wait(900);
      window.dispatchEvent(new CustomEvent("bot:lift", { detail: { key, up: false } }));
      await wait(250);
      busy.current = false;
      graceUntil.current = Date.now() + 900; // short breather before the next bump
      await wait(2200);
      setMessage((m) => (m === line ? null : m));
    };

    // Rope climb: gets stuck, throws a rope to the card's top, climbs up, perches and talks.
    const climb = async (el: HTMLElement, line: string) => {
      busy.current = true;
      setMoving(false);
      setAnim("strain");
      setMessage("Ugh, stuck!");
      await wait(550);
      const t = el.getBoundingClientRect();
      const hook = { x: t.left + t.width / 2, y: t.top + 3 };
      bot.style.setProperty("--face", hook.x >= pos.current.x + BOT_W / 2 ? "1" : "-1");
      setMessage(null);
      setAnim("throw");
      setRope({ x1: pos.current.x + BOT_W / 2, y1: pos.current.y + BOT_H * 0.6, x2: hook.x, y2: hook.y });
      await wait(420);
      setAnim("climb");
      bot.style.transition = "transform .9s cubic-bezier(.45,0,.25,1)";
      pos.current = clamp(hook.x - BOT_W / 2, t.top - BOT_H + 12);
      place();
      await wait(920);
      bot.style.transition = "";
      setRope(null);
      setAnim("perch");
      setMessage(line);
      await wait(1300);
      setAnim("bump"); // hops down beside the card, on the cursor's side
      const side = (cursor.current?.x ?? 0) >= t.left + t.width / 2 ? 1 : -1;
      bot.style.transition = "transform .45s ease-out";
      pos.current = clamp(side > 0 ? t.right + 6 : t.left - BOT_W - 6, t.bottom - BOT_H);
      bot.style.setProperty("--face", String(side));
      place();
      await wait(480);
      bot.style.transition = "";
      setAnim("");
      busy.current = false;
      graceUntil.current = Date.now() + 900; // short breather before the next bump
      await wait(1800);
      setMessage((m) => (m === line ? null : m));
    };

    const checkBumps = () => {
      if (Date.now() < graceUntil.current) return;
      const cx = pos.current.x + BOT_W / 2;
      const cy = pos.current.y + BOT_H / 2;
      const now = Date.now();
      const targets = document.querySelectorAll<HTMLElement>("[data-bot-say]");
      for (const el of Array.from(targets)) {
        const t = el.getBoundingClientRect();
        const hit = cx > t.left - 4 && cx < t.right + 4 && cy > t.top - 4 && cy < t.bottom + 4;
        if (!hit) continue;
        if (now - (cooldowns.current.get(el) ?? 0) < COOLDOWN_MS) continue;
        cooldowns.current.set(el, now);
        const line = el.dataset.botSay ?? "";
        if (el.dataset.botAct === "lift") void stunt(el, line);
        else if (el.dataset.botAct === "climb") void climb(el, line);
        else void bump(el, line);
        return;
      }
    };

    // Movement loop, synced to the display; velocity eases toward the goal for smooth walking.
    const vel = { x: 0, y: 0 };
    let last = performance.now();
    let frame = 0;
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (busy.current || caughtRef.current || napping.current) {
        vel.x = vel.y = 0;
        setMoving(false);
        return;
      }
      // Doze off when the mouse has been still a while.
      if (Date.now() - lastMove.current > NAP_AFTER_MS) {
        napping.current = true;
        setMoving(false);
        setAnim("nap");
        setMessage("Zzz…");
        return;
      }
      if (!cursor.current) return;
      const goal = clamp(cursor.current.x + FOLLOW_OFFSET.x - BOT_W / 2, cursor.current.y + FOLLOW_OFFSET.y - BOT_H / 2);
      const dx = goal.x - pos.current.x;
      const dy = goal.y - pos.current.y;
      const dist = Math.hypot(dx, dy);
      // Desired speed slows down as it arrives, capped at MAX_SPEED.
      const speed = Math.min(dist * 3, MAX_SPEED);
      const want = dist > 0.5 ? { x: (dx / dist) * speed, y: (dy / dist) * speed } : { x: 0, y: 0 };
      const k = 1 - Math.exp(-ACCEL * dt);
      vel.x += (want.x - vel.x) * k;
      vel.y += (want.y - vel.y) * k;
      pos.current = { x: pos.current.x + vel.x * dt, y: pos.current.y + vel.y * dt };
      const v = Math.hypot(vel.x, vel.y);
      setMoving(v > 18, Math.abs(vel.x) > 12 ? Math.sign(vel.x) : undefined);
      place();
      if (++frame % 4 === 0) checkBumps();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [follow]);

  const bubble = caught ? null : message ?? (follow ? null : "Tap me!");

  return (
    // In follow mode this is only the starting spot; the bot itself is fixed.
    <div ref={spotRef} className={follow ? "relative mt-8 h-0" : "relative mt-8 h-24"}>
      {/* Twine rope thrown up to a polaroid during the climb */}
      {rope && (
        <svg className="pointer-events-none fixed inset-0 z-[39] h-full w-full" aria-hidden="true">
          <path
            className="rope-throw"
            pathLength={1}
            d={`M ${rope.x1} ${rope.y1} Q ${(rope.x1 + rope.x2) / 2} ${Math.min(rope.y1, rope.y2) - 70} ${rope.x2} ${rope.y2}`}
            fill="none"
            stroke="#9a7b4f"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hook on the card's top edge */}
          <path
            className="rope-hook"
            d={`M ${rope.x2 - 5} ${rope.y2 - 6} q 5 -6 10 0 q 0 6 -5 9`}
            fill="none"
            stroke="#2b2622"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <div
        ref={botRef}
        data-moving="false"
        data-anim={anim}
        className={follow ? "robot fixed left-0 top-0 z-40" : "robot absolute left-0 top-4 z-10"}
      >
        <button
          type="button"
          onClick={() => {
            // Open the note on whichever side has room.
            setNoteOnLeft(follow && pos.current.x > window.innerWidth - 340);
            setCaught(true);
          }}
          aria-label="Catch the robot to see what I've been up to"
          className="block"
        >
          {/* Faces the way it walks; bot-art carries the bump/fall/peek animations */}
          <span className="bot-facing block">
            <span className="bot-art block drop-shadow-[0_6px_6px_rgba(30,25,15,0.28)]">
              <PaperBot happy={caught || anim === "peek" || anim === "perch"} sleepy={anim === "nap"} />
            </span>
          </span>
        </button>

        {bubble && (
          <span
            role="status"
            className="bot-note hand pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[220px] rounded-sm bg-[#fdfcf8] px-3 pb-1 pt-2 text-center text-[17px] leading-tight text-ink shadow-[0_6px_14px_-4px_rgba(30,25,15,0.35)]"
          >
            {/* Little strip of tape, like the polaroids */}
            <span className="absolute -top-1.5 left-1/2 h-3 w-9 -translate-x-1/2 -rotate-3 bg-amber-100/90" aria-hidden="true" />
            {bubble}
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#fdfcf8]" aria-hidden="true" />
          </span>
        )}

        {caught && (
          <div className={noteOnLeft ? "absolute right-full top-0 mr-2" : "absolute left-full top-0 ml-2"}>
            <RecentNote onClose={() => setCaught(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
