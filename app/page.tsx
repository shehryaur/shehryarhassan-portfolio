import { site } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-medium text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Minerva University · San Francisco, CA
          </div>

          <h1 className="mt-4 text-[40px] font-bold tracking-tight text-ink sm:text-[48px] leading-[1.08]">
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

        {/* Clean Portrait */}
        <div className="shrink-0">
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm sm:h-52 sm:w-52 md:h-56 md:w-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.avatar}
              alt={site.fullName}
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
