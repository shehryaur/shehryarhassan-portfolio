import EngravingPortrait from "@/components/EngravingPortrait";
import HighlightList from "@/components/HighlightList";

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

      {/* 
        Engraving Background:
        Anchored to bottom-right, spreading wide like a mountain silhouette from the base
        up to the point on the right, integrated as a seamless backdrop rather than a card.
      */}
      <div className="pointer-events-none z-0 overflow-hidden md:fixed md:right-0 md:bottom-0 md:top-0 md:w-[44vw] md:max-w-[700px] lg:w-[40vw] xl:w-[38vw] flex items-end justify-end max-md:relative max-md:mt-12 max-md:w-full max-md:h-[360px]">
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
