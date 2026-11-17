import ProjectTimeline from "@/components/ProjectTimeline";

export const metadata = { title: "Projects - Shehryar Hassan" };

export default function ProjectsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="rise text-[36px] font-bold tracking-tight text-ink sm:text-[42px] leading-tight">
          Projects
        </h1>
        <p className="rise mt-2 text-[15px] text-mute">
          Selected software, hackathon winners, and AI applications.
        </p>
      </div>
      <ProjectTimeline />
    </div>
  );
}
