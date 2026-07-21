import { site } from "@/lib/data";

// Deterministic 52-week × 7-day grid.
function buildGrid(seed = 7661): number[] {
  const cells: number[] = [];
  let s = seed;
  for (let i = 0; i < 52 * 7; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const v = r < 0.4 ? 0 : r < 0.62 ? 1 : r < 0.82 ? 2 : r < 0.94 ? 3 : 4;
    cells.push(v);
  }
  return cells;
}

const level = [
  "bg-[#ebedf0]",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
];

const months = [
  "Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun",
];

export default function ContributionGraph() {
  const cells = buildGrid();
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));

  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[15px] font-medium text-ink">
          {site.githubStats.contributions.toLocaleString()} contributions in the last year
        </h3>
        <a
          href={site.socials.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[12.5px] text-mute hover:text-ink"
        >
          {site.githubStats.handle}
          <span className="h-5 w-5 overflow-hidden rounded-full bg-subtle ring-1 ring-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.avatar} alt="" className="h-full w-full object-cover" />
          </span>
        </a>
      </div>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((v, di) => (
                    <span
                      key={di}
                      className={`h-[11px] w-[11px] rounded-[2px] ${level[v]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-12 text-[10px] text-soft">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
