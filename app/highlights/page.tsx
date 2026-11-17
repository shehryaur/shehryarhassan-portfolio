import HighlightList from "@/components/HighlightList";

export const metadata = { title: "Highlights - Shehryar Hassan" };

export default function HighlightsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="rise text-[36px] font-bold tracking-tight text-ink sm:text-[42px] leading-tight">
          Highlights
        </h1>
        <p className="rise mt-2 text-[15px] text-mute">
          Awards, research publications, and foundation initiatives.
        </p>
      </div>
      <HighlightList />
    </div>
  );
}
