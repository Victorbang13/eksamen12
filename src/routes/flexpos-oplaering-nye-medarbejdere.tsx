import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/flexpos-oplaering-nye-medarbejdere")({
  head: () => ({
    meta: [
      { title: "FlexPOS oplæring af nye medarbejdere — AMERO" },
      {
        name: "description",
        content:
          "Sådan giver du nye medarbejdere og frivillige en tryg FlexPOS oplæring – trin for trin, i eget tempo og uden risiko i kassen.",
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
              FlexPOS oplæring af nye medarbejdere
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              En god FlexPOS oplæring er forskellen på en stresset første vagt og
              en tryg start i kassen. På denne side gennemgår vi, hvordan I som
              butik eller forening kan bruge det indbyggede onboarding-flow til
              at lære nye medarbejdere og frivillige op i FlexPOS – uden at det
              går ud over hverdagen i butikken.
            </p>
          </div>
        </section>

        <article className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-20 space-y-12">
            <section aria-labelledby="hvorfor">
              <h2 id="hvorfor" className="text-2xl sm:text-3xl text-primary">
                Hvorfor struktureret oplæring i FlexPOS betaler sig
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                Nye medarbejdere – og især frivillige – møder ofte FlexPOS for
                første gang midt i en travl vagt. Når oplæringen er tilfældig,
                opstår der nemt fejl ved salg, retur og dagsafslutning. Et fast
                onboarding-forløb gør oplæringen ensartet, så alle lærer det
                samme uanset hvem der har vagten den dag.
              </p>
            </section>

            <section aria-labelledby="trin">
              <h2 id="trin" className="text-2xl sm:text-3xl text-primary">
                Sådan kommer nye brugere i gang – trin for trin
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    t: "Start i sandbox-miljøet",
                    d: "Den nye bruger logger ind i et isoleret testmiljø, der ligner den rigtige kasse 1:1. Intet salg registreres i jeres regnskab.",
                  },
                  {
                    t: "Gennemfør det guidede flow",
                    d: "FlexPOS guider igennem de mest brugte handlinger: oprette salg, bruge rabatkoder, modtage betaling og afslutte en kunde.",
                  },
                  {
                    t: "Øv svære situationer",
                    d: "Brugeren prøver retur, fejlslagne betalinger og dagsafslutning, så de første gange i den rigtige kasse ikke er de første gange overhovedet.",
                  },
                  {
                    t: "Få superbrugeren ind over",
                    d: "Butikkens superbruger godkender, at flowet er gennemført, og kan supplere med butikkens egne rutiner.",
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

            <section aria-labelledby="tips">
              <h2 id="tips" className="text-2xl sm:text-3xl text-primary">
                Gode råd til oplæring af frivillige
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Hold sessionerne korte – 20–30 minutter er nok ad gangen.",
                  "Lad den nye bruger selv klikke. Det er ok at lave fejl i sandbox.",
                  "Gentag de samme handlinger flere gange, før I går i den rigtige kasse.",
                  "Skriv butikkens særlige rutiner ned ét sted, så alle har samme udgangspunkt.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2
                      size={22}
                      className="text-primary flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-foreground/80 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="relateret" className="border-t border-soft pt-10">
              <h2 id="relateret" className="text-2xl text-primary">
                Relaterede guides
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/hvordan-laver-man-retur-i-flexpos"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    Hvordan laver man retur i FlexPOS?
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
                  Prøv onboarding-prototypen
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
