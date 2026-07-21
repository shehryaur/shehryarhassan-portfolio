import { tools } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Tools - Shehryar Hassan" };

/** Pastel tint per category to make cards light up on hover. */
const tintByCategory: Record<string, string> = {
  Editor:       "#e0e7ff",
  LLM:          "#fef3c7",
  Hosting:      "#dcfce7",
  Backend:      "#d1fae5",
  PM:           "#fce7f3",
  Productivity: "#ffe4e6",
  Frontend:     "#dbeafe",
};

export default function ToolsPage() {
  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        Tools
      </h1>
      <p className="mt-2 text-[14.5px] text-mute">
        The stack I use daily to build and ship.
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {tools.map((t) => {
          const tint = tintByCategory[t.category] || "#eef2ff";
          return (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="card card-tint group flex items-center justify-between gap-3 p-4"
              style={{ ["--hover-tint" as any]: tint }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14.5px] font-semibold text-ink">
                    {t.name}
                  </h3>
                  <span className="chip">{t.category}</span>
                </div>
                <p className="mt-1 text-[13px] text-ink/70">{t.description}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
