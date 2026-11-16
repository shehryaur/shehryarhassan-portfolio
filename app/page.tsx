import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { site } from "@/lib/data";

const honors = [
  {
    title: "Lanes",
    award: "2nd Place",
    event: "AIE Code Summit Hackathon",
    organizer: "Cerebral Valley & Meta",
    summary:
      "Cache-preserving smart routing and adaptive thinking budgets for coding agents.",
    href: "/projects#lanes",
    period: "Nov 2026",
  },
  {
    title: "Overcrank",
    award: "3rd Place",
    event: "Hack the Feed Hackathon",
    organizer: "Hack the Feed",
    summary:
      "Format arbitrage tool aligning raw video takes to high-performing edit physics.",
    href: "/projects#overcrank",
    period: "Nov 2026",
  },
  {
    title: "Curio",
    award: "1st Place",
    event: "Google x k-ID Hackathon",
    organizer: "Google & k-ID",
    summary:
      "Age-adaptive 3D interactive learning lessons generated from camera snapshots.",
    href: "/projects#curio",
    period: "Oct 2026",
  },
  {
    title: "PlanEd",
    award: "Winner",
    event: "SF Hacks x GDG Hackathon",
    organizer: "Google Developer Groups",
    summary:
      "Prerequisite graph engine and conflict-free degree planner covering 117 majors.",
    href: "/projects#planed",
    period: "Oct 2026",
  },
];

const highlights = [
  {
    title: "Adobe AI Product Strategy",
    role: "AI Product Strategist",
    period: "2025 - 2026",
    summary:
      "Authored 33-page strategy & LLM communication triage architecture for Adobe PM leadership.",
    href: "/highlights#adobe-ai-product-strategy",
  },
  {
    title: "Ar-Razzaq Foundation",
    role: "Co-Founder",
    period: "PKR 2M+ Raised",
    summary:
      "Funded 14 academic scholarships and critical surgeries across a community logistics network.",
    href: "/highlights#ar-razzaq-foundation",
  },
  {
    title: "Published Academic Research",
    role: "Lead Researcher",
    period: "Kurdish Studies Journal",
    summary:
      "Empirical mixed-methods study on industrial pollution and community health outcomes.",
    href: "/highlights#lead-academic-researcher",
  },
  {
    title: "National Academic Gold Medal",
    role: "Chief Minister Award",
    period: "Govt of Punjab",
    summary:
      "Top academic standing in the province for Secondary School Certificate examinations.",
    href: "/highlights#national-academic-gold-medal",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-medium text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Minerva University · San Francisco, CA
          </div>

          <h1 className="mt-4 text-[38px] font-bold tracking-tight text-ink sm:text-[46px] leading-[1.1]">
            Hey, I&apos;m Shehryar
          </h1>

          <p className="mt-2 text-[17px] font-medium text-mute">
            AI Product Builder &amp; Full-Stack Engineer
          </p>

          <div className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-ink/80">
            <p>
              I build AI products end-to-end: from customer discovery and technical architecture to shipping production software.
            </p>
            <p>
              Undergraduate at Minerva University studying{" "}
              <strong className="font-semibold text-ink">Computational Sciences</strong> and{" "}
              <strong className="font-semibold text-ink">Business</strong>.
            </p>
          </div>

          {/* Action Links */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-subtle"
            >
              <span>Experience</span>
            </Link>
            <Link
              href="/highlights"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-subtle"
            >
              <span>Highlights</span>
            </Link>
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

      {/* Recent Hackathon Honors */}
      <section className="border-t border-line pt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-mute">
              Recent Hackathon Honors
            </h2>
            <p className="mt-0.5 text-[14px] text-ink/80">
              Competitive builds, AI agents, and product awards
            </p>
          </div>
          <Link
            href="/projects"
            className="group hidden items-center gap-1 text-[13px] font-medium text-mute hover:text-ink sm:inline-flex"
          >
            <span>All projects</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {honors.map((h) => (
            <Link
              key={h.title}
              href={h.href}
              className="group flex flex-col justify-between rounded-xl border border-line bg-surface/60 p-4 transition-all hover:border-ink/40 hover:bg-surface hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-0.5 text-[11.5px] font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/20">
                    <Trophy size={12} strokeWidth={2.25} />
                    {h.award}
                  </span>
                  <span className="text-[12px] text-mute">{h.period}</span>
                </div>
                <h3 className="mt-2.5 text-[16px] font-bold text-ink">
                  {h.title}{" "}
                  <span className="text-[13px] font-normal text-mute">
                    · {h.event}
                  </span>
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/75">
                  {h.summary}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[12px] font-medium text-mute group-hover:text-ink">
                <span>View project</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Key Highlights */}
      <section className="border-t border-line pt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-mute">
              Key Highlights
            </h2>
            <p className="mt-0.5 text-[14px] text-ink/80">
              Enterprise partnerships, foundation leadership, and published research
            </p>
          </div>
          <Link
            href="/highlights"
            className="group hidden items-center gap-1 text-[13px] font-medium text-mute hover:text-ink sm:inline-flex"
          >
            <span>All highlights</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col justify-between rounded-xl border border-line bg-surface/60 p-4 transition-all hover:border-ink/40 hover:bg-surface hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[12px] text-mute">
                  <span className="font-medium text-ink/80">{item.role}</span>
                  <span>{item.period}</span>
                </div>
                <h3 className="mt-2 text-[15.5px] font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/75">
                  {item.summary}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[12px] font-medium text-mute group-hover:text-ink">
                <span>Read details</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
