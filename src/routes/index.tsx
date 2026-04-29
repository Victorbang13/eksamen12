import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forside — AMERO FlexPOS Onboarding" },
      {
        name: "description",
        content:
          "Gør FlexPOS oplæringen tryg og ensartet med et intuitivt onboarding-flow.",
      },
      { property: "og:title", content: "Forside — AMERO FlexPOS Onboarding" },
      {
        property: "og:description",
        content: "Et intuitivt onboarding-flow, der fjerner frygten for teknikken.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteNav />
      <main id="main">
        {/* Hero */}
        <section className="bg-soft">
          <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary">
                Gør FlexPOS oplæringen tryg og ensartet
              </h1>
              <h2 className="mt-6 text-xl sm:text-2xl text-primary font-medium">
                Et intuitivt onboarding-flow, der fjerner frygten for teknikken
                og skaber en standardiseret oplæring for alle brugere.
              </h2>
              <Link
                to="/prototypen"
                className="inline-block mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:opacity-90 focus-visible:outline-offset-4"
              >
                Prøv den interaktive løsning her
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=900&q=70"
                alt="Smilende butiksmedarbejder ved kassen"
                width={900}
                height={600}
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-sm shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
            <p className="text-lg">
              Vi har taget udgangspunkt i de mest udfordrede brugere for at
              skabe en løsning, der løfter bundniveauet. Gennem et pædagogisk,
              indbygget salgsflow kan alle frivillige og medarbejdere nu lære
              det basale salg i helt trygge rammer.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                ["Tryghed for alle", "Brugerne guides sikkert skridt for skridt."],
                ["Faste rammer", "En standardiseret oplæring for alle kunder."],
                ["Færre fejl", "Intuitive arbejdsgange mindsker supportopkald."],
              ].map(([title, desc]) => (
                <li
                  key={title}
                  className="bg-softer p-5 rounded-sm border-l-4 border-primary"
                >
                  <strong className="text-primary">{title}:</strong> {desc}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                to="/prototypen"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:opacity-90"
              >
                Prøv den interaktive løsning her
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
