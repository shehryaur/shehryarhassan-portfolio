import Link from "next/link";
import type { HighlightItem } from "@/lib/highlights";

export default function HighlightCard({ highlight }: { highlight: HighlightItem }) {
  return (
    <Link
      href={`/highlights/${highlight.slug}`}
      className="card card-tint overflow-hidden p-4 transition-shadow duration-300 hover:shadow-xl"
      style={{ ["--hover-tint" as any]: "#e2e8f0" }}
    >
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={highlight.image}
          alt={highlight.title}
          className="h-40 w-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-[18px] font-semibold leading-tight text-ink">
          {highlight.title}
        </h3>
        <p className="mt-3 text-[15px] leading-snug text-ink/70">
          {highlight.oneLiner}
        </p>
      </div>
    </Link>
  );
}
