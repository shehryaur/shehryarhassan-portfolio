import ExperienceTimeline from "@/components/ExperienceTimeline";

export const metadata = { title: "Experience - Shehryar Hassan" };

export default function ExperiencePage() {
  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        Experience
      </h1>
      <p className="mt-2 text-[14.5px] text-mute">
        A timeline of building, shipping, and learning.
      </p>

      <ExperienceTimeline />
    </div>
  );
}
