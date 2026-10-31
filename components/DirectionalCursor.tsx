"use client";

import { useEffect } from "react";

/**
 * Native (OS-drawn, zero-lag) cursor that turns to face the direction of
 * motion. The OS can only show images, so we swap the `--cursor-arrow`
 * variable that globals.css uses for `cursor`; with 1° steps and a per-frame
 * eased angle the turn reads as a smooth sweep.
 */
// 1° steps; images are built on first use and cached.
const STEPS = 360;

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

    const cache = new Map<number, string>();
    const root = document.documentElement;
    let lastX: number | null = null;
    let lastY = 0;
    // Smoothed movement direction (averages out tiny wobbles).
    let vx = 0;
    let vy = 0;
    let target = -35; // heading the motion asks for (0 = tip up); starts like the resting arrow
    let angle = -35; // heading actually shown, eased toward target every frame
    let current = NaN;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      if (lastX !== null) {
        vx = vx * 0.75 + (e.clientX - lastX) * 0.25;
        vy = vy * 0.75 + (e.clientY - lastY) * 0.25;
        // Only re-aim once there's real movement, so a still mouse keeps its heading.
        if (vx * vx + vy * vy > 2) target = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };

    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Ease along the shortest arc; frame-rate independent.
      const delta = ((target - angle + 540) % 360) - 180;
      if (Math.abs(delta) < 0.3) return;
      angle += delta * (1 - Math.exp(-12 * dt));
      const idx = ((Math.round(angle) % STEPS) + STEPS) % STEPS;
      if (idx === current) return;
      current = idx;
      let url = cache.get(idx);
      if (!url) {
        url = cursorFor(idx);
        cache.set(idx, url);
      }
      root.style.setProperty("--cursor-arrow", url);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
