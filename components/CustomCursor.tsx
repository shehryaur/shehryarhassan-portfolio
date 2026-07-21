"use client";

import { useEffect, useRef } from "react";

/**
 * Directional arrowhead cursor with a fading motion-blur trail.
 *
 * Behaviour (matches the reference video):
 *  - A solid-white delta / arrowhead follows the pointer.
 *  - The tip rotates smoothly to point in the direction of motion.
 *  - 5 "ghost" clones lag behind, each with lower opacity, producing a
 *    liquid trail. Faster movement → longer, more pronounced trail.
 *  - Hidden on touch devices and on the print stylesheet.
 *  - The native cursor is hidden site-wide via globals.css (`cursor: none`).
 */
export default function CustomCursor() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const ghostRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Target = latest mouse position. Points = eased positions per element.
  const target = useRef({ x: -100, y: -100 });
  const points = useRef<Array<{ x: number; y: number }>>([]);
  const angle = useRef(0);
  const rafId = useRef<number | null>(null);

  const GHOSTS = 5;

  useEffect(() => {
    // Skip on touch devices — a custom cursor is meaningless there.
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Seed all points off-screen so the first render doesn't flash at (0,0).
    points.current = Array.from({ length: GHOSTS + 1 }, () => ({
      x: -100,
      y: -100,
    }));

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    // Hover-state: when over an interactive element, expand + change blend.
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const interactive = el.closest(
        "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer"
      );
      mainRef.current?.classList.toggle("is-hover", !!interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    const tick = () => {
      const pts = points.current;
      // First point chases the raw target with a soft ease.
      pts[0].x += (target.current.x - pts[0].x) * 0.28;
      pts[0].y += (target.current.y - pts[0].y) * 0.28;

      // Compute travel angle from the last frame → gives the "direction facing".
      const dx = target.current.x - pts[0].x;
      const dy = target.current.y - pts[0].y;
      const speed = Math.hypot(dx, dy);
      if (speed > 0.4) {
        const desired = Math.atan2(dy, dx) * (180 / Math.PI);
        // Shortest-arc interpolation so the rotation eases instead of snapping.
        let delta = desired - angle.current;
        delta = ((delta + 540) % 360) - 180;
        angle.current += delta * 0.35;
      }

      // Each ghost eases toward the point in front of it — creates the trail.
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.4;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.4;
      }

      // Slight stretch on the leader when moving quickly.
      const stretch = Math.min(1 + speed * 0.012, 1.35);

      if (mainRef.current) {
        mainRef.current.style.transform =
          `translate3d(${pts[0].x}px, ${pts[0].y}px, 0) ` +
          `rotate(${angle.current + 90}deg) scale(${stretch}, ${2 - stretch})`;
      }

      for (let i = 0; i < GHOSTS; i++) {
        const g = ghostRefs.current[i];
        if (!g) continue;
        const p = pts[i + 1];
        g.style.transform =
          `translate3d(${p.x}px, ${p.y}px, 0) ` +
          `rotate(${angle.current + 90}deg)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // The arrowhead itself — SVG so it stays crisp at any size / DPR.
  const arrow = (fill: string) => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={fill}
      aria-hidden="true"
    >
      {/* A three-pointed delta with a concave trailing edge */}
      <path d="M12 2 L20 22 L12 17 L4 22 Z" />
    </svg>
  );

  return (
    <div className="cursor-layer" aria-hidden="true">
      {/* Trail ghosts — rendered behind, decreasing opacity. */}
      {Array.from({ length: GHOSTS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            ghostRefs.current[i] = el;
          }}
          className="cursor-ghost"
          style={{ opacity: 0.35 * (1 - i / GHOSTS) }}
        >
          {arrow("#000000")}
        </div>
      ))}

      {/* Leading cursor. */}
      <div ref={mainRef} className="cursor-main">
        {arrow("#ffffff")}
      </div>
    </div>
  );
}
