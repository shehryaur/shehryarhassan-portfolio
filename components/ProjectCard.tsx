"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data";

/** Outer card tint on hover — soft coloured glow behind the card. */
const cardTintByTag: Record<string, string> = {
  AI: "#dbeafe",
  Product: "#e0e7ff",
  EdTech: "#dcfce7",
  Growth: "#fde68a",
  Serverless: "#cffafe",
  Community: "#fce7f3",
  MVP: "#fef3c7",
  Validation: "#fed7aa",
  Python: "#e0f2fe",
  Analytics: "#ede9fe",
};

/** Coloured gradient applied to the project name on hover. */
const nameGradientByTag: Record<string, string> = {
  AI: "linear-gradient(90deg,#2563eb,#7c3aed)",
  Product: "linear-gradient(90deg,#4f46e5,#7c3aed)",
  EdTech: "linear-gradient(90deg,#059669,#0d9488)",
  Growth: "linear-gradient(90deg,#d97706,#dc2626)",
  Serverless: "linear-gradient(90deg,#0891b2,#2563eb)",
  Community: "linear-gradient(90deg,#db2777,#e11d48)",
  MVP: "linear-gradient(90deg,#ca8a04,#d97706)",
  Validation: "linear-gradient(90deg,#ea580c,#dc2626)",
  Python: "linear-gradient(90deg,#0284c7,#2563eb)",
  Analytics: "linear-gradient(90deg,#7c3aed,#c026d3)",
};

export default function ProjectCard({ project }: { project: Project }) {
  const primaryTag = project.tags[0] ?? "AI";
  const cardTint = cardTintByTag[primaryTag] || "#e0e7ff";
  const nameGrad =
    nameGradientByTag[primaryTag] || "linear-gradient(90deg,#2563eb,#7c3aed)";

  const [hovered, setHovered] = useState(false);
  const [starred, setStarred] = useState(false);

  const hostLabel =
    project.url && project.url !== "#"
      ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "internal";

  return (
    <div
      className="card card-tint overflow-hidden p-4"
      style={{ ["--hover-tint" as any]: cardTint }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ---------- Website preview (browser mock w/ real screenshot) ---------- */}
      <Link
        href={`/projects/${project.slug}`}
        className="block overflow-hidden rounded-lg border border-line bg-white"
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-line bg-[#fafaf9] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fcd34d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
          <div className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[10.5px] text-mute ring-1 ring-line">
            {hostLabel}
          </div>
        </div>
        {/* preview image — the site screenshot itself */}
        <div className="relative h-40 w-full overflow-hidden bg-subtle">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />
        </div>
      </Link>

      {/* ---------- Title row ---------- */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/projects/${project.slug}`}
            className="project-name text-[16px] font-semibold leading-tight"
            style={
              hovered
                ? {
                  backgroundImage: nameGrad,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }
                : { color: "#0a0a0a" }
            }
          >
            {project.name}
          </Link>
          <div className="mt-1 text-[12.5px] text-mute">
            {project.subtitle}
          </div>
        </div>

        <button
          aria-label={starred ? "Unstar project" : "Star project"}
          onClick={(e) => {
            e.preventDefault();
            setStarred((s) => !s);
          }}
          className={`shrink-0 transition-colors ${starred ? "text-amber-400" : "text-soft hover:text-ink"
            }`}
        >
          <Star size={16} fill={starred ? "currentColor" : "none"} />
        </button>
      </div>

      {/* ---------- Summary ---------- */}
      <p className="mt-2 text-[13px] leading-relaxed text-ink/75 line-clamp-3">
        {project.description}
      </p>

      {/* ---------- Actions ---------- */}
      <div className="mt-4 flex items-center gap-2">
        {project.url && project.url !== "#" && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <ExternalLink size={12.5} />
            Visit
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <Github size={12.5} />
            GitHub
          </a>
        )}
        <span
          className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-medium ${project.status === "active"
              ? "bg-emerald-100 text-emerald-700"
              : project.status === "beta"
                ? "bg-amber-100 text-amber-700"
                : "bg-neutral-200 text-neutral-600"
            }`}
        >
          {project.status}
        </span>
      </div>

      {/* ---------- Tech stack tags ---------- */}
      {project.stack?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-line bg-white/70 px-2 py-1 text-[11.5px] text-ink/75"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
