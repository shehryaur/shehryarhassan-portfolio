"use client";

import { useEffect } from "react";

/**
 * Native (OS-drawn, zero-lag) arrowhead cursor that turns to face the
 * direction of motion. We pre-build one rotated SVG per 5° and swap the
 * `--cursor-arrow` variable that globals.css uses for `cursor`.
 */
// 5° steps: fine enough that turning looks continuous.
const STEPS = 72;

const cursorFor = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  // Hotspot = arrow tip (12, 3.5) rotated around the centre (12, 12).
  const hx = Math.round(12 + 8.5 * Math.sin(rad));
  const hy = Math.round(12 - 8.5 * Math.cos(rad));
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>` +
    // Rounded triangle: white body with a thick black outline, tip at (12, 3)
    `<path transform='rotate(${deg} 12 12)' d='M12 3.5 L19.5 19.5 Q12 15.5 4.5 19.5 Z' ` +
    `fill='white' stroke='#0a0a0a' stroke-width='2.6' stroke-linejoin='round'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hx} ${hy}, auto`;
};

export default function DirectionalCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursors = Array.from({ length: STEPS }, (_, i) => cursorFor((i * 360) / STEPS));
    const root = document.documentElement;
    let anchorX = 0;
    let anchorY = 0;
    let angle = 0; // smoothed heading in degrees (0 = tip up)
    let current = -1;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - anchorX;
      const dy = e.clientY - anchorY;
      // Ignore jitter: only re-aim after the pointer travels a few pixels.
      if (dx * dx + dy * dy < 16) return;
      anchorX = e.clientX;
      anchorY = e.clientY;

      // Tip points "up" at 0°, so motion angle + 90° aims it along the motion.
      const target = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      // Ease toward the target along the shortest arc, so turns sweep
      // through the in-between angles instead of snapping.
      const delta = ((target - angle + 540) % 360) - 180;
      angle += delta * 0.35;

      const idx = ((Math.round(angle / (360 / STEPS)) % STEPS) + STEPS) % STEPS;
      if (idx !== current) {
        current = idx;
        root.style.setProperty("--cursor-arrow", cursors[idx]);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
