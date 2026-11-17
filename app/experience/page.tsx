import ExperienceTimeline from "@/components/ExperienceTimeline";

export const metadata = { title: "Experience - Shehryar Hassan" };

export default function ExperiencePage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="rise text-[36px] font-bold tracking-tight text-ink sm:text-[42px] leading-tight">
          Experience
        </h1>
        <p className="rise mt-2 text-[15px] text-mute">
          Product management, enterprise solutions engineering, and AI strategy.
        </p>
      </div>
      <ExperienceTimeline />
    </div>
  );
}
