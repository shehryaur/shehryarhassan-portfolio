import EngravingPortrait from "@/components/EngravingPortrait";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-xl pt-2">
        <h1 className="text-[40px] font-bold tracking-tight text-ink sm:text-[48px] leading-[1.08]">
          Hey, I&apos;m Shehryar
        </h1>

        <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-ink/85">
          <p>
            I build AI products end to end: talk to users, write the spec, ship the code.
          </p>
          <p>
            I&apos;m an undergraduate at Minerva University studying{" "}
            <span className="block pt-2 text-[22px] font-bold leading-tight text-ink md:text-[26px]">
              Computational Sciences <span className="text-ink/55">and</span> Business.
            </span>
          </p>
          <p className="pt-1 text-[15px] text-mute">
            Rotating across Pakistan, San Francisco, Tokyo, Buenos Aires, Berlin.
          </p>
        </div>
      </div>

      {/* 
        Engraving Background:
        Anchored to bottom-right, spreading wide like a mountain silhouette from the base
        up to the point on the right, integrated as a seamless backdrop rather than a card.
      */}
      <div className="pointer-events-none z-0 overflow-hidden md:fixed md:right-0 md:bottom-0 md:top-0 md:w-[44vw] md:max-w-[700px] lg:w-[40vw] xl:w-[38vw] flex items-end justify-end max-md:relative max-md:mt-8 max-md:w-full max-md:h-[460px]">
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
