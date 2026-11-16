import EngravingPortrait from "@/components/EngravingPortrait";

export default function HomePage() {
  return (
    <div className="pt-2">
      {/* Hero Section */}
      <section className="flex flex-col-reverse gap-8 md:grid md:grid-cols-[1fr_360px] md:items-center md:gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-medium text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Minerva University · San Francisco, CA
          </div>

          <h1 className="mt-5 text-[40px] font-bold tracking-tight text-ink sm:text-[48px] leading-[1.08]">
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
          </div>
        </div>

        {/* Moving Vector / Banknote Engraving Portrait */}
        <div className="flex justify-center md:justify-end">
          <div className="relative h-[440px] w-[300px] sm:h-[500px] sm:w-[340px] md:h-[560px] md:w-[360px]">
            <EngravingPortrait className="h-full w-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
