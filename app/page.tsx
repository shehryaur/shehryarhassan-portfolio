import EngravingPortrait from "@/components/EngravingPortrait";
import HighlightList from "@/components/HighlightList";
import { rotationTimeline } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Foreground Content */}
      <section className="relative z-10 max-w-xl">
        <h1 className="rise text-[36px] font-bold tracking-tight text-ink sm:text-[42px] leading-tight">
          Hey, I&apos;m Shehryar
        </h1>
        <p className="rise mt-2 text-[15px] text-mute">
          Turning code into products people actually use.
        </p>
        <p className="rise mt-3 text-[14.5px] leading-relaxed text-ink/80">
          Undergraduate at Minerva University studying Computational Sciences and Business.
        </p>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="relative z-10 max-w-[480px] mt-24 md:mt-60 scroll-mt-10">
        <HighlightList />
      </section>

      {/* Mobile rotation footer - only on homepage */}
      <footer className="mt-20 border-t border-line/70 pt-8 pb-10 md:hidden relative z-10 max-w-[480px]">
        <div className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-soft">
          Rotation
        </div>
        <div className="space-y-1.5 font-mono text-[12.5px]">
          {rotationTimeline.map((item) => (
            <div key={item.year} className="flex items-baseline gap-2.5">
              <span className="text-mute tabular-nums shrink-0">{item.year}</span>
              <span className="text-ink/80">{item.location}</span>
            </div>
          ))}
        </div>
      </footer>

      {/* 
        Engraving Background:
        Anchored to bottom-right, spreading wide like a mountain silhouette from the base
        up to the point on the right, integrated as a seamless backdrop rather than a card.
        On mobile, rendered as a subtle background behind the content instead of at the bottom.
      */}
      <div className="pointer-events-none z-0 overflow-hidden fixed right-0 bottom-0 top-0 w-full md:w-[44vw] md:max-w-[700px] lg:w-[40vw] xl:w-[38vw] flex items-end justify-end max-md:opacity-40">
        <EngravingPortrait
          className="h-full w-full"
          offsetX={0.34}
          offsetY={-0.10}
          scale={1.24}
        />
      </div>
    </div>
  );
}
