import Link from "next/link";
import { highlights } from "@/lib/highlights";

export default function HighlightsGrid() {
  return (
    <section className="mt-10 w-full max-w-[320px]">
      <div className="grid gap-2 sm:grid-cols-2">
        {highlights.map((highlight) => (
          <Link
            key={highlight.slug}
            href={`/highlights/${highlight.slug}`}
            className="group relative overflow-hidden rounded-[24px] border border-white/40 bg-white/10 transition-all duration-300 hover:z-30 hover:scale-110 hover:-translate-y-1 hover:shadow-xl"
            style={{ transformOrigin: "center center" }}
          >
            <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-[24px] bg-transparent p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={highlight.image}
                alt={highlight.title}
                className="max-h-[60px] max-w-[105px] rounded-[18px] object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="w-full px-2 pb-2 text-center text-[11px] font-semibold text-white">
                {highlight.text}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
