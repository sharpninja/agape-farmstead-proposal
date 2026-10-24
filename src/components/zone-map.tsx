const CX = 200;
const CY = 198;
const RADIUS = 132;

type Stop = {
  name: string;
  bearing: number;
  r: number;
  farm?: boolean;
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
};

const stops: Stop[] = [
  { name: "Adams", bearing: -32, r: 50, farm: true, dx: -12, dy: 4, anchor: "end" },
  { name: "Hopkinsville", bearing: -50, r: 88, dx: -10, dy: -2, anchor: "end" },
  { name: "Paducah", bearing: -66, r: 122, dx: -8, dy: -4, anchor: "end" },
  { name: "Murfreesboro", bearing: 142, r: 62, dx: 10, dy: 4, anchor: "start" },
  { name: "Chattanooga", bearing: 128, r: 120, dx: 8, dy: 4, anchor: "start" },
  { name: "Bowling Green", bearing: 12, r: 100, dx: 10, dy: -2, anchor: "start" },
  { name: "Huntsville", bearing: 178, r: 118, dx: 0, dy: 16, anchor: "middle" },
  { name: "Cookeville", bearing: 84, r: 78, dx: 0, dy: -14, anchor: "middle" },
  { name: "Knoxville", bearing: 100, r: 122, dx: 0, dy: 16, anchor: "middle" },
  { name: "Jackson", bearing: -118, r: 118, dx: -10, dy: 4, anchor: "end" },
];

function at(bearing: number, r: number) {
  const rad = (bearing * Math.PI) / 180;
  return {
    x: CX + Math.sin(rad) * r,
    y: CY - Math.cos(rad) * r,
  };
}

function chain(names: string[]) {
  return names
    .map((name) => {
      const stop = stops.find((item) => item.name === name);
      if (!stop) return "";
      const { x, y } = at(stop.bearing, stop.r);
      return `${x},${y}`;
    })
    .join(" ");
}

const roads = [
  { name: "I-24 NW", color: "#8a5a2b", line: `${CX},${CY} ${chain(["Adams", "Hopkinsville", "Paducah"])}` },
  { name: "I-24 SE", color: "#c47a3a", line: `${CX},${CY} ${chain(["Murfreesboro", "Chattanooga"])}` },
  { name: "I-65 N", color: "#2f3a22", line: `${CX},${CY} ${chain(["Bowling Green"])}` },
  { name: "I-65 S", color: "#8a9a62", line: `${CX},${CY} ${chain(["Huntsville"])}` },
  { name: "I-40 E", color: "#4f6b32", line: `${CX},${CY} ${chain(["Cookeville", "Knoxville"])}` },
  { name: "I-40 W", color: "#3d5c58", line: `${CX},${CY} ${chain(["Jackson"])}` },
];

export function ZoneMap() {
  return (
    <figure className="rounded-card bg-paper px-2 pt-2 pb-3 text-ink">
      <svg viewBox="0 0 400 400" role="img" className="h-auto w-full">
        <title>Six delivery corridors leaving Nashville on I-24, I-65, and I-40</title>
        <circle cx={CX} cy={CY} r={RADIUS} fill="#f4efe4" stroke="#6b7f3a" strokeWidth="1.5" strokeDasharray="4 5" />
        <text x={CX} y={CY - RADIUS - 8} textAnchor="middle" fill="#6b7f3a" fontSize="11" fontFamily="Outfit, sans-serif" fontWeight="600">
          200 miles
        </text>
        <text x={CX + 10} y={CY - RADIUS + 16} fill="#8a8172" fontSize="11" fontFamily="Outfit, sans-serif">
          N
        </text>
        {roads.map((road) => (
          <polyline
            key={road.name}
            points={road.line}
            fill="none"
            stroke={road.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.28"
          />
        ))}
        {roads.map((road) => (
          <polyline
            key={`${road.name}-core`}
            points={road.line}
            fill="none"
            stroke={road.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {stops.map((stop) => {
          const { x, y } = at(stop.bearing, stop.r);
          return (
            <g key={stop.name}>
              {stop.farm ? (
                <circle cx={x} cy={y} r="8" fill="none" stroke="#8a5a2b" strokeWidth="2" />
              ) : null}
              <circle cx={x} cy={y} r="3.5" fill={stop.farm ? "#8a5a2b" : "#2f3a22"} />
              <text
                x={x + (stop.dx ?? 0)}
                y={y + (stop.dy ?? -12)}
                textAnchor={stop.anchor ?? "middle"}
                fill="#2a261f"
                fontSize="12"
                fontFamily="Outfit, sans-serif"
                fontWeight="600"
                stroke="#f7f1e5"
                strokeWidth="4"
                paintOrder="stroke"
              >
                {stop.name}
              </text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r="7" fill="#2f3a22" />
        <circle cx={CX} cy={CY} r="3" fill="#d5e3a4" />
        <text
          x={CX}
          y={CY + 20}
          textAnchor="middle"
          fill="#2f3a22"
          fontSize="13"
          fontFamily="Outfit, sans-serif"
          fontWeight="700"
          stroke="#f7f1e5"
          strokeWidth="4"
          paintOrder="stroke"
        >
          Nashville
        </text>
      </svg>
      <figcaption className="mt-1 flex flex-col gap-2 px-2">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 px-1 text-[11px] font-semibold tracking-wide">
          {roads.map((road) => (
            <li key={road.name} className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-4 rounded-full" style={{ background: road.color }} />
              {road.name}
            </li>
          ))}
        </ul>
        <p className="text-center text-xs leading-relaxed text-muted">
          Six corridors leave Nashville. Each one is a batch. Adams is the farm.
        </p>
      </figcaption>
    </figure>
  );
}
