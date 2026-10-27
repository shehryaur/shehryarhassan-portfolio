"use client";

import RecentlyBot from "@/components/RecentlyBot";
import ScatteredHighlights from "@/components/ScatteredHighlights";

/** Minerva rotation cities, all shown at once (no waiting for a rotator). */
const rotation = ["San Francisco", "Tokyo", "Berlin", "Buenos Aires"];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="lg:flex lg:items-start lg:justify-between lg:gap-10">
        <div className="lg:max-w-2xl">
          <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight text-ink md:text-[56px]">
            Hey, I&apos;m Shehryar
          </h1>
          {/* Bio block */}
          <div className="mt-8 space-y-4 text-[15px] leading-[1.8] text-ink/90">
            <p>I build AI products end to end: talk to users, write the spec, ship the code.</p>
            <p>
              I&apos;m an undergraduate at Minerva University studying{" "}
              <span className="block pt-2 text-[23px] font-bold leading-tight text-ink md:text-[28px]">
                Computational Sciences <span className="text-ink/55">and</span> Business.
              </span>
            </p>
          </div>

          <div className="mt-7 text-[14px] font-medium text-ink/70">
            Minerva rotation:{" "}
            <span className="text-ink">{rotation.join(" · ")}</span>
          </div>

          {/* Wandering bot: catch it to see recent wins */}
          <RecentlyBot />
        </div>

        <div className="mt-10 flex-shrink-0 lg:mt-0 lg:w-80">
          {/* Photo + highlight polaroids, pinned together */}
          <ScatteredHighlights />
        </div>
      </section>
    </div>
  );
}
