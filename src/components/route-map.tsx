const CX = 200;
const CY = 198;

type Stop = {
  name: string;
  bearing: number;
  r: number;
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
  farm?: boolean;
};

type Route = {
  name: string;
  color: string;
  stops: Stop[];
};

function at(bearing: number, r: number) {
  const rad = (bearing * Math.PI) / 180;
  return {
    x: CX + Math.sin(rad) * r,
    y: CY - Math.cos(rad) * r,
  };
}

const routes: Route[] = [
  {
    name: "I-24 NW",
    color: "#8a5a2b",
    stops: [
      { name: "Adams", bearing: -36, r: 48, farm: true, dx: -14, dy: 3, anchor: "end" },
      { name: "Clarksville", bearing: -48, r: 76, dx: -8, dy: 12, anchor: "end" },
      { name: "Hopkinsville", bearing: -56, r: 104, dx: -8, dy: -12, anchor: "end" },
      { name: "Paducah", bearing: -66, r: 126, dx: -8, dy: -2, anchor: "end" },
    ],
  },
  {
    name: "I-24 SE",
    color: "#c47a3a",
    stops: [
      { name: "Murfreesboro", bearing: 146, r: 64, dx: 10, dy: 2, anchor: "start" },
      { name: "Chattanooga", bearing: 128, r: 124, dx: 8, dy: 2, anchor: "start" },
    ],
  },
  {
    name: "I-65 N",
    color: "#2f3a22",
    stops: [{ name: "Bowling Green", bearing: 10, r: 112, dx: 10, dy: -2, anchor: "start" }],
  },
  {
    name: "I-65 S",
    color: "#8a9a62",
    stops: [
      { name: "Franklin", bearing: 188, r: 50, dx: -10, dy: 3, anchor: "end" },
      { name: "Huntsville", bearing: 176, r: 122, dx: 0, dy: 16, anchor: "middle" },
    ],
  },
  {
    name: "I-40 E",
    color: "#4f6b32",
    stops: [
      { name: "Cookeville", bearing: 82, r: 78, dx: 0, dy: -14, anchor: "middle" },
      { name: "Knoxville", bearing: 102, r: 124, dx: 0, dy: 15, anchor: "middle" },
    ],
  },
  {
    name: "I-40 W",
    color: "#3d5c58",
    stops: [
      { name: "Dickson", bearing: -102, r: 58, dx: 0, dy: 14, anchor: "middle" },
      { name: "Jackson", bearing: -120, r: 122, dx: -8, dy: 2, anchor: "end" },
    ],
  },
];

function pointsFor(route: Route) {
  const last = route.stops[route.stops.length - 1];
  const tip = at(last.bearing, last.r + 18);
  const coords = [`${CX},${CY}`];
  for (const stop of route.stops) {
    const { x, y } = at(stop.bearing, stop.r);
    coords.push(`${x},${y}`);
  }
  coords.push(`${tip.x},${tip.y}`);
  return coords.join(" ");
}

export function RouteMap() {
  return (
    <figure className="rounded-card bg-paper px-2 pt-2 pb-3 text-ink">
      <svg viewBox="0 0 400 400" role="img" className="h-auto w-full">
        <title>Six delivery routes leaving Nashville, with stops in drive order</title>
        <circle cx={CX} cy={CY} r="132" fill="#f4efe4" stroke="#6b7f3a" strokeWidth="1.5" strokeDasharray="4 5" />
        <text
          x={CX}
          y={CY - 140}
          textAnchor="middle"
          fill="#6b7f3a"
          fontSize="11"
          fontFamily="Outfit, sans-serif"
          fontWeight="600"
        >
          200 miles
        </text>
        <defs>
          {routes.map((route) => (
            <marker
              key={route.name}
              id={`route-arrow-${route.name.replace(/\s+/g, "")}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={route.color} />
            </marker>
          ))}
        </defs>
        {routes.map((route) => (
          <polyline
            key={route.name}
            points={pointsFor(route)}
            fill="none"
            stroke={route.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd={`url(#route-arrow-${route.name.replace(/\s+/g, "")})`}
          />
        ))}
        {routes.map((route) =>
          route.stops.map((stop, index) => {
            const { x, y } = at(stop.bearing, stop.r);
            return (
              <g key={`${route.name}-${stop.name}`}>
                <circle cx={x} cy={y} r="8" fill="#f7f1e5" stroke={route.color} strokeWidth="2" />
                <text
                  x={x}
                  y={y + 3.5}
                  textAnchor="middle"
                  fill={route.color}
                  fontSize="10"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="700"
                >
                  {index + 1}
                </text>
                <text
                  x={x + stop.dx}
                  y={y + stop.dy}
                  textAnchor={stop.anchor}
                  fill="#2a261f"
                  fontSize="11"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="600"
                  stroke="#f7f1e5"
                  strokeWidth="4"
                  paintOrder="stroke"
                >
                  {stop.farm ? "Adams · farm" : stop.name}
                </text>
              </g>
            );
          }),
        )}
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
      <figcaption className="mt-1 flex flex-col gap-2 px-1">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-semibold tracking-wide">
          {routes.map((route) => (
            <li key={route.name} className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-4 rounded-full" style={{ background: route.color }} />
              {route.name}
            </li>
          ))}
        </ul>
        <p className="text-center text-xs leading-relaxed text-muted">
          Arrows leave Nashville. Numbers are the stop order on that route.
        </p>
      </figcaption>
    </figure>
  );
}
