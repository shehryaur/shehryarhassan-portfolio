import { highlights } from "@/lib/highlights";
import HighlightCard from "@/components/HighlightCard";

export const metadata = { title: "Highlights - Shehryar Hassan" };

export default function HighlightsPage() {
  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        Highlights
      </h1>
      <p className="mt-2 text-[14.5px] text-mute">
        A curated set of my home page highlights with more context and details.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {highlights.map((item) => (
          <HighlightCard key={item.slug} highlight={item} />
        ))}
      </div>
    </div>
  );
}
