import { notFound } from "next/navigation";
import { highlights } from "@/lib/highlights";
import { FileText } from "lucide-react";

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

        {highlight.pdfs && highlight.pdfs.length > 0 && (
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-[18px] font-semibold text-ink">Project PDFs</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {highlight.pdfs.map((pdf) => (
                <a
                  key={pdf.href}
                  href={pdf.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-line bg-white p-4 transition-colors hover:bg-subtle"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                    <FileText size={17} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">
                      {pdf.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-mute">
                      {pdf.description}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
