import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/flexpos-pengeskuffe-aabner-ikke")({
  head: () => ({
    meta: [
      { title: "FlexPOS pengeskuffe åbner ikke — fejlfinding | AMERO" },
      {
        name: "description",
        content:
          "Pengeskuffen åbner ikke i FlexPOS? Følg denne tjekliste til hurtig fejlfinding af kabler, bonprinter, drivere og kasseindstillinger.",
      },
      { property: "og:title", content: "FlexPOS pengeskuffe åbner ikke — fejlfinding | AMERO" },
      {
        property: "og:description",
        content:
          "Tjekliste til at få pengeskuffen til at åbne igen i FlexPOS.",
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
              Fejlfinding
            </p>
            <h1
              id="title"
              tabIndex={-1}
              className="mt-4 text-4xl sm:text-5xl text-primary scroll-mt-24 focus:outline-none"
            >
              FlexPOS pengeskuffe åbner ikke
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Når pengeskuffen ikke åbner i FlexPOS, står man ofte med en kunde
              foran sig og brug for et hurtigt svar. De fleste tilfælde skyldes
              en løs kabelforbindelse til bonprinteren eller en indstilling, der
              er hoppet af. Følg tjeklisten nedenfor i rækkefølge – så finder du
              fejlen på få minutter.
            </p>
          </div>
        </section>

        <article className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-20 space-y-12">
            <section aria-labelledby="hurtigt">
              <h2 id="hurtigt" className="text-2xl sm:text-3xl text-primary">
                Prøv først dette
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Lav et testsalg på 0 kr. – åbner skuffen så, er kassen ok.",
                  "Tryk på ‘Åbn skuffe’-knappen i FlexPOS (kræver rettighed).",
                  "Sluk bonprinteren i 10 sekunder og tænd den igen.",
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

            <section aria-labelledby="trin">
              <h2 id="trin" className="text-2xl sm:text-3xl text-primary">
                Tjekliste – trin for trin
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    t: "Tjek kablet mellem skuffe og bonprinter",
                    d: "Pengeskuffen åbnes via et RJ11/RJ12-kabel fra bonprinterens bagside. Sæt det helt i – det skal klikke fast.",
                  },
                  {
                    t: "Tjek at bonprinteren har strøm og papir",
                    d: "Hvis printeren er offline, sender FlexPOS heller ikke åbne-signalet videre til skuffen.",
                  },
                  {
                    t: "Kontroller printer-driveren i Windows",
                    d: "Printeren skal stå som ‘Klar’ – ikke ‘Offline’ eller ‘Pauset’. Genstart spooleren hvis nødvendigt.",
                  },
                  {
                    t: "Tjek FlexPOS-indstillinger",
                    d: "Under Indstillinger → Hardware skal pengeskuffen være sat til den korrekte bonprinter og kasse.",
                  },
                  {
                    t: "Prøv den fysiske nøgle",
                    d: "Åbner skuffen med nøglen, men ikke fra FlexPOS, er fejlen elektronisk – typisk kabel eller driver.",
                  },
                  {
                    t: "Genstart kassen",
                    d: "Hjælper intet af ovenstående, så luk FlexPOS helt ned og genstart computeren.",
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

            <section aria-labelledby="kontakt">
              <h2 id="kontakt" className="text-2xl sm:text-3xl text-primary">
                Stadig ingen åben skuffe?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                Hvis pengeskuffen fortsat ikke vil åbne, er det tid til at
                kontakte Ameros support. Hav serienummeret på bonprinter og
                pengeskuffe klar – så går fejlsøgningen hurtigere.
              </p>
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
                    to="/hvordan-laver-man-retur-i-flexpos"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    Hvordan laver man retur i FlexPOS?
                  </Link>
                </li>
              </ul>
              <p className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:opacity-90 shadow-md"
                >
                  Tilbage til forsiden
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
