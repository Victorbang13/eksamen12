import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/flexpos-oplaering-nye-medarbejdere")({
  head: () => ({
    meta: [
      { title: "FlexPOS oplæring af nye medarbejdere — AMERO" },
      {
        name: "description",
        content:
          "Sådan giver du nye medarbejdere og frivillige en tryg oplæring i FlexPOS – trin for trin, i deres eget tempo og uden risiko i kassen.",
      },
      { property: "og:title", content: "FlexPOS oplæring af nye medarbejdere — AMERO" },
      {
        property: "og:description",
        content:
          "Få nye brugere godt fra start i FlexPOS med et struktureret onboarding-flow.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <section className="bg-soft">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
              Guide
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl text-primary">
              FlexPOS oplæring af nye medarbejdere
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Denne side er under opbygning. Her samler vi snart en grundig
              guide til, hvordan I introducerer nye medarbejdere og frivillige
              til FlexPOS – med fokus på tryghed, gentagelse og selvstændighed.
            </p>
            <p className="mt-8">
              <Link to="/" className="text-primary underline underline-offset-4">
                ← Tilbage til forsiden
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
