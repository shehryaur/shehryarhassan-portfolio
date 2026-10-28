/**
 * Home background: Minerva's rotation drawn as a pencil-dashed flight path
 * that loops around the page, with a paper plane parked at the current city.
 * Fixed behind the page content (desktop only; phones get the text line).
 *
 * Coordinates are percentages of the area right of the sidebar, so the city
 * pins (HTML) and the path (SVG, non-uniformly scaled) line up at any size.
 */
const cities = [
  { name: "San Francisco", note: "now", x: 10, y: 82 },
  { name: "Tokyo", note: "next", x: 45, y: 92 },
  { name: "Berlin", note: "", x: 80, y: 80 },
  { name: "Buenos Aires", note: "", x: 92, y: 28 },
];

// Short trail into SF (where the plane came from), then the route ahead.
const trail = "M 0 70 C 4 76, 6 80, 10 82";
const route = [
  "M 10 82",
  "C 22 96, 34 98, 45 92", // SF -> Tokyo
  "C 56 86, 60 70, 68 74", // swoop up...
  "C 76 78, 70 90, 80 80", // ...small loop before Berlin
  "C 92 68, 99 52, 92 28", // Berlin -> Buenos Aires, up the right edge
].join(" ");

export default function FlightPath() {
  const sf = cities[0];
  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-[300px] right-0 -z-10 hidden lg:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={trail} fill="none" stroke="#0a0a0a" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path className="flight-dash" d={route} fill="none" stroke="#0a0a0a" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="7 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* City pins: small paper dots with handwritten names */}
      {cities.map((c, i) => (
        <div
          key={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <span
            className={`block h-3 w-3 rounded-full border-2 ${
              i === 0 ? "border-ink bg-amber-300" : "border-ink/30 bg-[#fdfcf8]"
            }`}
          />
          <span
            className={`hand absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[18px] leading-none ${
              i === 0 ? "text-ink/75" : "text-ink/35"
            }`}
          >
            {c.name}
            {c.note && <span className="ml-1 text-[14px] text-ink/40">({c.note})</span>}
          </span>
        </div>
      ))}

      {/* Label where the trail enters */}
      <span className="hand absolute text-[16px] leading-none text-ink/35" style={{ left: "1.5%", top: "64%" }}>
        Minerva rotation
      </span>

      {/* Paper plane parked at SF, nose toward Tokyo */}
      <div
        className="absolute -translate-x-1/2 -translate-y-[130%] rotate-[38deg]"
        style={{ left: `${sf.x}%`, top: `${sf.y}%` }}
      >
        <svg
          viewBox="0 0 48 32"
          width="44"
          height="30"
          className="plane-float drop-shadow-[0_5px_5px_rgba(30,25,15,0.25)]"
        >
          {/* Body and folded wing */}
          <path d="M2 14 L46 2 L20 20 Z" fill="#fdfcf8" stroke="#0a0a0a" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M20 20 L46 2 L28 30 Z" fill="#efeeec" stroke="#0a0a0a" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M20 20 L22 27" stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
