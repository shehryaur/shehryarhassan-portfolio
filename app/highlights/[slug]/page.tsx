import { notFound } from "next/navigation";
import { highlights } from "@/lib/highlights";

export const metadata = { title: "Highlight - Shehryar Hassan" };

export default function HighlightDetailPage({ params }: { params: { slug: string } }) {
  const highlight = highlights.find((item) => item.slug === params.slug);
  if (!highlight) return notFound();

  return (
    <article className="max-w-3xl">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={highlight.image}
          alt={highlight.title}
          className="h-72 w-full object-cover"
        />
      </div>

      <div className="mt-8">
        <h1 className="text-[36px] font-bold leading-tight tracking-tight text-ink md:text-[44px]">
          {highlight.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
          {highlight.summary}
        </p>

        <ul className="mt-6 space-y-3 pl-5 text-[15px] leading-relaxed text-ink/90">
          {highlight.details.map((detail) => (
            <li key={detail} className="list-disc">
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
