import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, List, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { plainTitle, type Deck, type DeckSlide } from "@/data/decks";
import { RichTitle } from "@/components/rich-title";
import { ZoneMap } from "@/components/zone-map";
import { RouteMap } from "@/components/route-map";

type Props = {
  deck: Deck;
  slideNumber: number;
};

export function DeckView({ deck, slideNumber }: Props) {
  const navigate = useNavigate();
  const total = deck.slides.length;
  const index = Math.min(Math.max(slideNumber, 1), total) - 1;
  const slide = deck.slides[index];
  const [outline, setOutline] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const indexRef = useRef(index);
  const outlineRef = useRef(outline);
  const goRef = useRef<(next: number) => void>(() => {});
  indexRef.current = index;
  outlineRef.current = outline;

  function go(next: number) {
    const clamped = Math.min(Math.max(next, 1), total);
    setOutline(false);
    void navigate({
      to: "/deck/$slug",
      params: { slug: deck.slug },
      search: { s: clamped },
      replace: true,
    });
  }
  goRef.current = go;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        go(index + 2);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(1);
      } else if (event.key === "End") {
        event.preventDefault();
        go(total);
      } else if (event.key === "Escape") {
        setOutline(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const stage = el;

    let active: { id: number; x: number; y: number; lastX: number; lastY: number } | null = null;
    let committed = false;

    function commit(dx: number, dy: number) {
      if (committed) return;
      if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy)) return;
      committed = true;
      const current = indexRef.current;
      goRef.current(dx < 0 ? current + 2 : current);
    }

    function onDown(event: PointerEvent) {
      if (outlineRef.current) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const target = event.target;
      if (target instanceof Element && target.closest("a, button")) return;
      committed = false;
      active = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
      };
      stage.setPointerCapture(event.pointerId);
    }

    function onMove(event: PointerEvent) {
      if (!active || active.id !== event.pointerId) return;
      active.lastX = event.clientX;
      active.lastY = event.clientY;
    }

    function finish(event: PointerEvent) {
      if (!active || active.id !== event.pointerId) return;
      const dx = active.lastX - active.x;
      const dy = active.lastY - active.y;
      active = null;
      commit(dx, dy);
    }

    function onTouchMove(event: TouchEvent) {
      if (!active || event.touches.length !== 1) return;
      const touch = event.touches[0];
      active.lastX = touch.clientX;
      active.lastY = touch.clientY;
      const dx = touch.clientX - active.x;
      const dy = touch.clientY - active.y;
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) event.preventDefault();
    }

    function onTouchEnd(event: TouchEvent) {
      if (!active) return;
      const touch = event.changedTouches[0];
      if (touch) {
        active.lastX = touch.clientX;
        active.lastY = touch.clientY;
      }
      const dx = active.lastX - active.x;
      const dy = active.lastY - active.y;
      active = null;
      commit(dx, dy);
    }

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", finish);
    el.addEventListener("pointercancel", finish);
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", finish);
      el.removeEventListener("pointercancel", finish);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="deck-root flex min-h-dvh flex-col bg-forest text-cream">
      <header className="flex h-14 shrink-0 items-center gap-3 px-3 sm:px-5">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-cream"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Decks
        </Link>
        <p className="min-w-0 flex-1 truncate text-center text-sm text-cream/75">{deck.title}</p>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-sprout"
          onClick={() => setOutline(true)}
          aria-expanded={outline}
        >
          <List className="size-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">
            {index + 1}/{total}
          </span>
        </button>
      </header>
      <div className="h-1 shrink-0 bg-canopy" aria-hidden="true">
        <div className="h-full bg-sprout transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto">
        <article
          key={`${deck.slug}-${index}`}
          className="slide-enter mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-5 py-8 sm:px-8"
          aria-live="polite"
        >
          <SlideBody slide={slide} />
        </article>
      </main>

      <nav className="flex h-16 shrink-0 items-center justify-between gap-3 border-t border-cream/10 px-3 sm:px-5">
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-medium text-cream disabled:opacity-35"
          onClick={() => go(index)}
          disabled={index === 0}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
        <div className="flex items-center gap-1.5" aria-label="Slides">
          {deck.slides.map((item, dot) => (
            <button
              key={plainTitle(item.title)}
              type="button"
              aria-label={`Slide ${dot + 1}: ${plainTitle(item.title)}`}
              aria-current={dot === index ? "true" : undefined}
              className={dot === index ? "h-2 w-6 rounded-full bg-sprout" : "size-2 rounded-full bg-cream/35"}
              onClick={() => go(dot + 1)}
            />
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-medium text-cream disabled:opacity-35"
          onClick={() => go(index + 2)}
          disabled={index === total - 1}
        >
          Next
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </nav>

      {outline ? (
        <div
          className="fixed inset-0 z-20 flex items-end bg-ink/50 sm:items-center sm:justify-center"
          onClick={() => setOutline(false)}
        >
          <div
            className="max-h-[80dvh] w-full overflow-y-auto rounded-t-card bg-paper px-5 py-5 text-ink sm:max-w-md sm:rounded-card"
            role="dialog"
            aria-label="Slide outline"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Slides</h2>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full"
                onClick={() => setOutline(false)}
                aria-label="Close outline"
              >
                <X className="size-5" />
              </button>
            </div>
            <ol className="flex flex-col">
              {deck.slides.map((item, dot) => (
                <li key={plainTitle(item.title)}>
                  <button
                    type="button"
                    className="flex w-full items-baseline gap-3 border-b border-ink/10 py-3 text-left"
                    onClick={() => go(dot + 1)}
                  >
                    <span className="w-6 shrink-0 font-display text-lg text-copper">
                      {String(dot + 1).padStart(2, "0")}
                    </span>
                    <span className={dot === index ? "font-medium" : "text-muted"}>{plainTitle(item.title)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SlideBody({ slide }: { slide: DeckSlide }) {
  return (
    <div className="flex flex-col gap-5">
      {slide.phase ? (
        <p className="font-display text-5xl leading-none font-semibold text-sprout/45 sm:text-6xl">{slide.phase}</p>
      ) : null}
      {slide.tag ? (
        <p className="text-xs font-semibold tracking-widest text-sprout uppercase">{slide.tag}</p>
      ) : null}
      {slide.timeline ? (
        <p className="text-xs font-medium tracking-widest text-cream/65 uppercase">{slide.timeline}</p>
      ) : null}
      <RichTitle text={slide.title} />
      {slide.subtitle ? (
        <p className="max-w-prose text-base leading-relaxed text-cream/80 sm:text-lg">{slide.subtitle}</p>
      ) : null}
      {slide.map ? <ZoneMap /> : null}
      {slide.routes ? <RouteMap /> : null}
      {slide.stats ? (
        <div className="grid grid-cols-3 gap-2">
          {slide.stats.map((stat) => (
            <div key={stat.l} className="rounded-card bg-paper px-2 py-3 text-center text-ink">
              <p className="font-display text-3xl font-semibold text-olive">{stat.n}</p>
              <p className="mt-1 text-xs leading-tight text-balance text-muted">{stat.l}</p>
            </div>
          ))}
        </div>
      ) : null}
      {slide.list ? (
        <ul className="flex flex-col">
          {slide.list.map((item) => (
            <li key={item} className="flex gap-3 border-b border-cream/15 py-3 text-base leading-relaxed text-cream">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-sprout" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {slide.cards ? (
        <div className="flex flex-col gap-3">
          {slide.cards.map((card) => (
            <div key={card.title} className="rounded-card bg-paper px-4 py-3 text-ink">
              {card.pillar ? (
                <p className="mb-1 text-xs font-semibold tracking-widest text-copper uppercase">{card.pillar}</p>
              ) : null}
              <h2 className="font-display text-xl font-semibold">{card.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{card.text}</p>
            </div>
          ))}
        </div>
      ) : null}
      {slide.note ? (
        <p className="rounded-card border-l-4 border-copper bg-paper px-4 py-4 text-sm leading-relaxed text-ink">
          {slide.note}
        </p>
      ) : null}
      {slide.ask ? (
        <div className="rounded-card border border-copper bg-paper px-5 py-5 text-ink">
          <h2 className="font-display text-2xl font-semibold text-copper">{slide.ask.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{slide.ask.text}</p>
          <a
            href={slide.ask.href}
            className="mt-4 inline-flex h-12 items-center rounded-full bg-copper px-6 text-sm font-semibold text-cream"
          >
            {slide.ask.button}
          </a>
        </div>
      ) : null}
      {slide.footer ? <p className="text-center text-xs leading-relaxed text-cream/60">{slide.footer}</p> : null}
    </div>
  );
}
