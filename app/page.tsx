"use client";

import FlightPath from "@/components/FlightPath";
import RecentlyBot from "@/components/RecentlyBot";
import ScatteredHighlights from "@/components/ScatteredHighlights";

/** Minerva rotation cities, all shown at once (no waiting for a rotator). */
const rotation = ["San Francisco", "Tokyo", "Berlin", "Buenos Aires"];

export default function HomePage() {
  return (
    <div>
      {/* Minerva rotation as a paper-plane route behind the page (desktop) */}
      <FlightPath />

      {/* Hero */}
      <section className="lg:flex lg:items-start lg:justify-between lg:gap-10">
        <div className="lg:max-w-2xl">
          <h1 data-bot-say="That's Shehryar. Say hi!" className="w-fit text-[44px] font-bold leading-[1.05] tracking-tight text-ink md:text-[56px]">
            Hey, I&apos;m Shehryar
          </h1>
          {/* Bio block */}
          <div className="mt-8 space-y-4 text-[17px] leading-[1.75] text-ink/90">
            <p>
              I&apos;m an undergraduate at Minerva University studying{" "}
              <span data-bot-say="Computational Sciences + Business. Both brains!" className="block w-fit pt-2 text-[23px] font-bold leading-tight text-ink md:text-[28px]">
                Computational Sciences <span className="text-ink/55">and</span> Business.
              </span>
            </p>
          </div>

          <div className="mt-7 text-[14px] font-medium text-ink/70 lg:hidden">
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
