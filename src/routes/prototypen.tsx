// Prototype-side (/prototypen) — embedder den interaktive Figma-prototype
// af FlexPOS onboarding-flowet.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

// Custom hook der returnerer true når viewport er smallere end 768px.
import { useIsMobile } from "@/hooks/use-mobile";

// Route-konfiguration for "/prototypen".
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
      // Preconnect mod Figmas domæner sparer DNS/TLS-tid før iframen loader.
      { rel: "preconnect", href: "https://embed.figma.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://www.figma.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://static.figma.com", crossOrigin: "anonymous" },
      // dns-prefetch er et fallback for browsere uden preconnect-support.
      { rel: "dns-prefetch", href: "https://embed.figma.com" },
    ],
  }),
  component: Prototype,
});

/**
 * Side-layout: intro-tekst + embed + CTA til designguiden.
 */
function Prototype() {
  return (
    <>
      <SiteNav />
      <main id="main">
        {/* Intro-sektion med side-titel og kort beskrivelse. */}
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

        {/* Selve iframe-embedden — afkoblet i sin egen komponent. */}
        <section aria-labelledby="embed">
          <h2 id="embed" tabIndex={-1} className="sr-only scroll-mt-24 focus:outline-none">Interaktiv prototype</h2>
          <PrototypeEmbed />
        </section>


        {/* Afsluttende CTA der leder videre til designguiden. */}
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
      <SiteFooter />
    </>
  );
}

/**
 * Indlejret Figma-prototype med fuldskærms-toggle (kun på mobil, hvor
 * iframen ellers er for lille til at navigere komfortabelt).
 */
function PrototypeEmbed() {
  // Detekter mobil for at vise "Fuld skærm"-knappen betinget.
  const isMobile = useIsMobile();
  // State holder styr på om vi er i fullscreen-tilstand.
  const [fullscreen, setFullscreen] = useState(false);
  // Ref til wrapper-elementet — bruges af Fullscreen API'et.
  const containerRef = useRef<HTMLDivElement>(null);

  // URL til den eksporterede Figma-prototype.
  // - hide-ui=1 fjerner Figmas eget UI så det matcher vores design.
  // - bg-color=FFFFFF sætter baggrunden bag prototypen.
  const iframeSrc =
    "https://embed.figma.com/proto/lJH1sQMRckEgrwtfUsJ69i/Hovedopgave?node-id=21-468&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=21%3A468&embed-host=share&hide-ui=1&bg-color=FFFFFF";

  /**
   * Skifter mellem normal- og fuldskærms-tilstand. Bruger browserens
   * Fullscreen API hvis tilgængeligt; ellers falder vi tilbage til at
   * toggle en CSS-klasse der dækker hele viewport.
   */
  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        // requestFullscreen er optional chained fordi Safari iOS ikke supporterer det.
        await el.requestFullscreen?.();
        setFullscreen(true);
      } else {
        await document.exitFullscreen?.();
        setFullscreen(false);
      }
    } catch {
      // Fallback: hvis Fullscreen API fejler, toggle vi bare CSS-fullscreen.
      setFullscreen((v) => !v);
    }
  };

  return (
    <div className="px-4 py-6">
      <div
        ref={containerRef}
        // I fullscreen dækker containeren hele viewport; ellers en centreret kasse.
        className={
          fullscreen
            ? "fixed inset-0 z-50 bg-white p-2 flex flex-col"
            : "mx-auto w-full max-w-5xl bg-white p-[15px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        }
      >
        {/* Fuldskærms-knap vises kun på mobil. */}
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
        {/* Wrapper med aspect-ratio (paddingBottom 60%) som holder iframens
            højde proportional med bredden i normal-mode. I fullscreen
            fylder den hele den ledige plads. */}
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
            // Slår scrolling fra fordi Figma-prototypen selv håndterer navigation.
            scrolling="no"
            allowFullScreen
            // loading="eager" — vi vil have prototypen klar med det samme.
            loading="eager"
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
