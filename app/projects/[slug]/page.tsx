import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const hostLabel =
    project.url && project.url !== "#"
      ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "internal";

  return (
    <article className="max-w-2xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-[13px] text-mute hover:text-ink"
      >
        <ArrowLeft size={13} /> All Projects
      </Link>

      {/* Header */}
      <h1 className="mt-6 text-[36px] font-bold leading-tight tracking-tight text-ink md:text-[42px]">
        {project.name}
      </h1>
      <p className="mt-1.5 text-[14.5px] text-mute">
        {project.subtitle}
      </p>

      <p className="mt-5 text-[14px] leading-relaxed text-ink/85">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px] text-mute">
        <span>By Shehryar Hassan</span>
        <span>·</span>
        <span>{project.date}</span>
      </div>

      {/* Tech badges */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>

      {/* Website preview */}
      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center gap-1.5 border-b border-line bg-[#fafaf9] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fcd34d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
          <div className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[11px] text-mute ring-1 ring-line">
            {hostLabel}
          </div>
        </div>
        <div className="relative h-56 md:h-72">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.url && project.url !== "#" && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white hover:opacity-90"
          >
            Visit <ArrowUpRight size={14} />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-ink hover:bg-subtle"
          >
            <Github size={14} /> GitHub
          </a>
        )}
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${project.status === "active"
              ? "bg-emerald-100 text-emerald-700"
              : project.status === "beta"
                ? "bg-amber-100 text-amber-700"
                : "bg-neutral-200 text-neutral-600"
            }`}
        >
          {project.status}
        </span>
      </div>

      {/* -------- Case study body -------- */}

      {/* Vision quote */}
      {project.vision && (
        <blockquote className="mt-12 border-l-2 border-ink/70 pl-4 text-[15px] leading-relaxed text-ink/85">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-soft">
            The Product Vision
          </span>
          <p className="mt-1 italic">{project.vision}</p>
        </blockquote>
      )}

      {/* The User Problem */}
      <section className="mt-10">
        <h2 className="text-[18px] font-bold text-ink">The User Problem</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink/85">
          {project.userProblem}
        </p>
      </section>

      {/*Architecture */}
      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-ink">
          Architecture
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink/85">
          {project.decisions.map((d, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/70" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Product & Growth Impact */}
      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-ink">
          Product & Growth Impact
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink/85">
          {project.impact.map((d, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
