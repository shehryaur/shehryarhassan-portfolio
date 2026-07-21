import { posts } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Blogs - Shehryar Hassan" };

export default function BlogsPage() {
  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        Blogs
      </h1>
      <p className="mt-2 text-[14.5px] text-mute">
          Starting Soon  -- Stay Connected
      </p>

      <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
        {posts.map((p) => (
          <a
            key={p.slug}
            href={`#${p.slug}`}
            className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-subtle/60"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11.5px] text-soft">
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-soft">·</span>
                <span className="text-[11.5px] text-soft">{p.readTime}</span>
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <h3 className="mt-1.5 text-[15.5px] font-medium text-ink">
                {p.title}
              </h3>
              <p className="mt-1 text-[13px] text-ink/70">{p.excerpt}</p>
            </div>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
