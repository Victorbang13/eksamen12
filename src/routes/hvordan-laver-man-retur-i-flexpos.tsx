import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ArrowRight, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/hvordan-laver-man-retur-i-flexpos")({
  head: () => ({
    meta: [
      { title: "Hvordan laver man retur i FlexPOS? — AMERO" },
      {
        name: "description",
        content:
          "Sådan laver du en retur i FlexPOS trin for trin – så kassen stemmer, og kunden får pengene retur korrekt.",
      },
      { property: "og:title", content: "Hvordan laver man retur i FlexPOS? — AMERO" },
      {
        property: "og:description",
        content:
          "Enkel og pålidelig vejledning til at lave retur i FlexPOS-kassesystemet.",
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
        <section className="bg-soft" aria-labelledby="title">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
              Guide
            </p>
            <h1
              id="title"
              tabIndex={-1}
              className="mt-4 text-4xl sm:text-5xl text-primary scroll-mt-24 focus:outline-none"
            >
              Hvordan laver man retur i FlexPOS?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              At lave en retur i FlexPOS er en af de handlinger, der oftest
              driller nye medarbejdere. Heldigvis er fremgangsmåden den samme
              hver gang. Her får du en rolig trin-for-trin vejledning, så både
              kassen og kunden ender det rigtige sted.
            </p>
          </div>
        </section>

        <article className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-20 space-y-12">
            <section aria-labelledby="foer">
              <h2 id="foer" className="text-2xl sm:text-3xl text-primary">
                Inden du går i gang
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                Find kundens originale bon eller ordrenummer frem. En retur i
                FlexPOS er nemmest, når den knyttes til det oprindelige salg –
                så følger moms, rabatter og betalingsmetode automatisk med
                tilbage.
              </p>
            </section>

            <section aria-labelledby="trin">
              <h2 id="trin" className="text-2xl sm:text-3xl text-primary">
                Sådan laver du en retur i FlexPOS
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    t: "Åbn salgsbilledet",
                    d: "Log ind med din egen brugerkode, så returen bliver registreret på dig.",
                  },
                  {
                    t: "Vælg ‘Retur’ eller ‘Returnér bon’",
                    d: "Knappen ligger typisk i bunden af kassevinduet eller under menuen ‘Funktioner’.",
                  },
                  {
                    t: "Find det oprindelige salg",
                    d: "Indtast bonnummer eller scan bonens stregkode. Hele bonen hentes ind.",
                  },
                  {
                    t: "Markér de varer kunden returnerer",
                    d: "Vælg kun de linjer, der skal med retur. Beløbet opdateres automatisk.",
                  },
                  {
                    t: "Bekræft og udbetal",
                    d: "Vælg samme betalingsmetode som det oprindelige salg – kort, MobilePay eller kontant – og afslut returen.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center font-semibold"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl text-primary">{s.t}</h3>
                      <p className="mt-2 text-foreground/80 leading-relaxed">
                        {s.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="vigtigt" className="bg-softer p-6 rounded-sm border-l-4 border-primary">
              <h2 id="vigtigt" className="text-xl text-primary inline-flex items-center gap-2">
                <AlertCircle size={22} aria-hidden="true" />
                Vigtigt at huske
              </h2>
              <ul className="mt-4 space-y-2 text-foreground/80 leading-relaxed list-disc pl-5">
                <li>Returer skal altid foregå på samme butiks-kasse, hvis muligt.</li>
                <li>Beløbet skal udbetales i samme betalingsform som købet.</li>
                <li>Gem altid den nye retur-bon sammen med dagens kasseopgørelse.</li>
              </ul>
            </section>

            <section aria-labelledby="relateret" className="border-t border-soft pt-10">
              <h2 id="relateret" className="text-2xl text-primary">
                Relaterede guides
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/flexpos-oplaering-nye-medarbejdere"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    FlexPOS oplæring af nye medarbejdere
                  </Link>
                </li>
                <li>
                  <Link
                    to="/flexpos-pengeskuffe-aabner-ikke"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    FlexPOS pengeskuffe åbner ikke – fejlfinding
                  </Link>
                </li>
              </ul>
              <p className="mt-8">
                <Link
                  to="/prototypen"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:opacity-90 shadow-md"
                >
                  Øv retur i prototypen
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
