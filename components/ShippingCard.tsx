import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ShippingItem } from "@/lib/data";

/** Soft pastel accents keyed by name — matches the reference "Currently shipping" feel. */
const tintByName: Record<string, string> = {
  Promptsmint: "#fef3c7", // amber
  AidenGPT:    "#dbeafe", // sky
  "Gita Chat": "#fee2e2", // rose
  "Kay AI":    "#dcfce7", // green
  niahere:     "#ede9fe", // violet
};

export default function ShippingCard({ item }: { item: ShippingItem }) {
  const tint = tintByName[item.name] || "#f3f4f6";
  return (
    <div
      className="card card-tint p-5"
      style={{ ["--hover-tint" as any]: tint }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-ink">{item.name}</h3>
        {item.metric && (
          <span className="meta-mono shrink-0 pt-0.5">{item.metric}</span>
        )}
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75">
        {item.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-[13px]">
        <a
          href={item.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="ulink inline-flex items-center gap-0.5 text-ink"
        >
          Live <ArrowUpRight size={13} />
        </a>
        {item.notesUrl && (
          <Link
            href={item.notesUrl}
            className="inline-flex items-center gap-0.5 text-ink/80 hover:text-ink"
          >
            Notes <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}
