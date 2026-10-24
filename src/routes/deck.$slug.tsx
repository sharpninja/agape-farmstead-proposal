import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getDeck } from "@/data/decks";
import { DeckView } from "@/components/deck-view";

type DeckSearch = { s: number };

export const Route = createFileRoute("/deck/$slug")({
  validateSearch: (search: Record<string, unknown>): DeckSearch => {
    const raw = Number(search.s);
    return { s: Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1 };
  },
  loader: ({ params }) => {
    const deck = getDeck(params.slug);
    if (!deck) throw notFound();
    return deck;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Agape Farmstead` : "Proposal" },
      { name: "description", content: loaderData?.metaDescription ?? "" },
    ],
  }),
  notFoundComponent: MissingDeck,
  component: DeckPage,
});

function DeckPage() {
  const deck = Route.useLoaderData();
  const { s } = Route.useSearch();
  return <DeckView deck={deck} slideNumber={s} />;
}

function MissingDeck() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-forest px-6 text-center text-cream">
      <h1 className="font-display text-4xl font-semibold">Deck not found</h1>
      <p className="max-w-sm text-cream/75">That proposal isn’t in this set.</p>
      <Link
        to="/"
        className="inline-flex h-12 items-center rounded-full bg-copper px-6 text-sm font-semibold text-cream"
      >
        Back to decks
      </Link>
    </main>
  );
}
