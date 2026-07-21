import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const metadata = { title: "Projects - Shehryar Hassan" };

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        Projects
      </h1>
      <p className="mt-2 text-[14.5px] text-mute">
        Playground - Small MVP to Production Apps
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
