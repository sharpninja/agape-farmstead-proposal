import type { ReactNode } from "react";

const TOKEN = /__(ACCENT2|ACCENT)__(.+?)__/g;

function renderLine(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = new RegExp(TOKEN.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line))) {
    if (match.index > last) nodes.push(line.slice(last, match.index));
    nodes.push(
      <span key={match.index} className={match[1] === "ACCENT2" ? "text-copper" : "text-sprout"}>
        {match[2]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  if (nodes.length === 0) nodes.push(line);
  return nodes;
}

export function RichTitle({ text }: { text: string }) {
  const lines = text.split(/<br\s*\/?>/i);
  return (
    <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
      {lines.map((line, index) => (
        <span key={index} className="block">
          {renderLine(line)}
        </span>
      ))}
    </h1>
  );
}
