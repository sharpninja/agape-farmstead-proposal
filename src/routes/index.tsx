import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Leaf, Search, Sprout, Truck } from "lucide-react";
import { decks, type Deck } from "@/data/decks";

export const Route = createFileRoute("/")({ component: Home });

const icons = {
  seo: Search,
  thanksgiving: Truck,
  brand: Sprout,
} as const;

function Home() {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <header className="bg-forest px-5 pt-10 pb-8 text-cream sm:px-8">
        <div className="mx-auto max-w-xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-sprout uppercase">
            <Leaf className="size-4" aria-hidden="true" />
            Agape Farmstead
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none font-semibold tracking-tight">
            Proposal Decks
          </h1>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-cream/80">
            Growing reach, rooted in faith and the land. Three proposals for
            agapefarmstead.com — Clarksville and Adams, Tennessee.
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-xl flex-col gap-4 px-5 py-6 sm:px-8">
        {decks.map((deck, index) => (
          <DeckCard key={deck.slug} deck={deck} index={index} />
        ))}
      </main>

      <footer className="mx-auto flex max-w-xl flex-col gap-2 px-5 pt-2 pb-10 text-sm text-muted sm:px-8">
        <p>Prepared for Agape Farmstead LLC</p>
        <p>Prepared by Payton Byrd</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a className="text-olive underline-offset-2 hover:underline" href="https://www.agapefarmstead.com">
            agapefarmstead.com
          </a>
          <a className="text-olive underline-offset-2 hover:underline" href="tel:+16155748101">
            615-574-8101
          </a>
          <a
            className="text-olive underline-offset-2 hover:underline"
            href="mailto:plbyrd@gmail.com"
          >
            plbyrd@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}

function DeckCard({ deck, index }: { deck: Deck; index: number }) {
  const Icon = icons[deck.slug as keyof typeof icons] ?? Leaf;
  return (
    <Link
      to="/deck/$slug"
      params={{ slug: deck.slug }}
      search={{ s: 1 }}
      className="group rounded-card border border-ink/10 bg-paper p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-forest text-sprout">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-display text-2xl text-copper">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h2 className="mt-4 font-display text-2xl leading-tight font-semibold">{deck.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{deck.blurb}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-olive uppercase">
        {deck.eyebrow}
        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </p>
    </Link>
  );
}
