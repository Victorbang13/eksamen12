import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/prototypen")({
  head: () => ({
    meta: [
      { title: "Prototypen — AMERO FlexPOS Onboarding" },
      {
        name: "description",
        content:
          "Interaktiv Figma-prototype af det nye onboarding-flow til FlexPOS.",
      },
      { property: "og:title", content: "Prototypen — AMERO" },
      {
        property: "og:description",
        content: "Afprøv det interaktive onboarding-flow.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://embed.figma.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://www.figma.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://static.figma.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://embed.figma.com" },
    ],
  }),
  component: Prototype,
});

function Prototype() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <section className="bg-softer" aria-labelledby="intro">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <h1 id="intro" tabIndex={-1} className="text-3xl sm:text-4xl text-primary scroll-mt-24 focus:outline-none">Prototypen</h1>
            <p className="mt-3 text-base">
              Dette er en interaktiv Figma-prototype af det nye onboarding-flow
              til FlexPOS. Den er designet til at være tilgængelig for alle —
              uanset teknisk erfaringsniveau. Klik dig igennem flowet nedenfor.
            </p>
          </div>
        </section>

        <section aria-labelledby="embed">
          <h2 id="embed" tabIndex={-1} className="sr-only scroll-mt-24 focus:outline-none">Interaktiv prototype</h2>
          <PrototypeEmbed />
        </section>


        <section className="bg-primary on-primary text-primary-foreground" aria-labelledby="videre">
          <div className="mx-auto max-w-4xl px-4 py-8 text-center">
            <h2 id="videre" tabIndex={-1} className="sr-only scroll-mt-24 focus:outline-none">Næste skridt</h2>
            <Link
              to="/designguiden"
              className="inline-block bg-background text-primary px-6 py-3 rounded-sm font-medium hover:opacity-90"
            >
              Se Designguiden
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function PrototypeEmbed() {
  const isMobile = useIsMobile();
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const iframeSrc =
    "https://embed.figma.com/proto/lJH1sQMRckEgrwtfUsJ69i/Hovedopgave?node-id=21-468&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=21%3A468&embed-host=share&hide-ui=1&bg-color=FFFFFF";

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen?.();
        setFullscreen(true);
      } else {
        await document.exitFullscreen?.();
        setFullscreen(false);
      }
    } catch {
      setFullscreen((v) => !v);
    }
  };

  return (
    <div className="px-4 py-6">
      <div
        ref={containerRef}
        className={
          fullscreen
            ? "fixed inset-0 z-50 bg-white p-2 flex flex-col"
            : "mx-auto w-full max-w-5xl bg-white p-[15px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        }
      >
        {isMobile && (
          <div className="flex justify-end pb-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium"
              aria-label={fullscreen ? "Luk fuld skærm" : "Vis i fuld skærm"}
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              {fullscreen ? "Luk fuld skærm" : "Fuld skærm"}
            </button>
          </div>
        )}
        <div
          className={
            fullscreen
              ? "relative flex-1 overflow-hidden rounded-lg bg-white"
              : "relative w-full overflow-hidden rounded-lg bg-white"
          }
          style={fullscreen ? undefined : { paddingBottom: "60%" }}
        >
          <iframe
            title="FlexPOS onboarding prototype"
            src={iframeSrc}
            scrolling="no"
            allowFullScreen
            loading="eager"
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
