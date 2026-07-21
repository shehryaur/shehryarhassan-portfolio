"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { highlights } from "@/lib/highlights";

const STORY_DURATION_MS = 7000; // total time per highlight

export default function HighlightsStory() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        startTimeRef.current = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTimeRef.current;
            const pct = Math.min((elapsed / STORY_DURATION_MS) * 100, 100);
            setProgress(pct);

            if (elapsed >= STORY_DURATION_MS) {
                setActiveIndex((i) => (i + 1) % highlights.length);
                return; // stop; the effect will restart on index change
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [activeIndex]);

    const activeHighlight = highlights[activeIndex];

    const goPrevious = () => {
        setActiveIndex((current) =>
            current === 0 ? highlights.length - 1 : current - 1
        );
    };

    const goNext = () => {
        setActiveIndex((current) => (current + 1) % highlights.length);
    };

    return (
        <section className="mt-10 w-full max-w-[460px]">
            {/* Progress bars */}
            <div className="mb-2 flex gap-1 px-12">
                {highlights.map((item, index) => (
                    <div
                        key={item.slug}
                        className="h-[3px] flex-1 overflow-hidden rounded-full bg-surface"
                    >
                        <div
                            className="h-full rounded-full bg-ink"
                            style={{
                                width:
                                    index < activeIndex
                                        ? "100%"
                                        : index === activeIndex
                                            ? `${progress}%`
                                            : "0%",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Hover zone: card + surrounding padding where arrows live */}
            <div className="group relative px-10">
                <div className="relative flex overflow-hidden rounded-[19px] border border-line bg-white shadow-xl transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-black/30">
                    {/* Image (left) — square-ish, full height of card */}
                    <div className="w-[45%] shrink-0 overflow-hidden bg-subtle">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={activeHighlight.image}
                            alt={activeHighlight.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Text panel (right) */}
                    <div className="flex flex-1 flex-col justify-center px-4 py-3">
                        <p className="text-[9px] uppercase tracking-[0.25em] text-mute">
                            Highlight
                        </p>
                        <h2 className="mt-1 text-[14px] font-semibold leading-tight text-ink">
                            {activeHighlight.title}
                        </h2>
                        <p className="mt-2 text-[11px] leading-snug text-ink/80">
                            {activeHighlight.oneLiner}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={goPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-label="Previous highlight"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-label="Next highlight"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}
