import EngravingPortrait from "@/components/EngravingPortrait";
import HighlightList from "@/components/HighlightList";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Foreground Content */}
      <section className="relative z-10 max-w-xl pt-2">
        <h1 className="text-[38px] font-bold tracking-tight text-ink sm:text-[46px] leading-[1.08]">
          Hey, I&apos;m Shehryar
        </h1>

        <div className="mt-5 space-y-4 text-[16px] leading-[1.75] text-ink/85">
          <p>
            Turning code into products people actually use.
          </p>
          <p>
            I&apos;m an undergraduate at Minerva University studying{" "}
            <span className="block pt-2 text-[22px] font-bold leading-tight text-ink md:text-[25px]">
              Computational Sciences <span className="text-ink/55">and</span> Business.
            </span>
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="relative z-10 mt-14 md:mt-20 scroll-mt-10">
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
