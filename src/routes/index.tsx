import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

import { ShieldCheck, Clock, HandHeart, Quote, ArrowRight, MonitorPlay, BookOpenCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forside — AMERO FlexPOS Onboarding" },
      {
        name: "description",
        content:
          "Oplev FlexPOS' nye indbyggede onboarding. Et trygt sandbox-miljø, hvor nye medarbejdere og frivillige kan lære kassesystemet i deres eget tempo.",
      },
      { property: "og:title", content: "Forside — AMERO FlexPOS Onboarding" },
      {
        property: "og:description",
        content:
          "Et trygt testmiljø i FlexPOS, hvor nye brugere kan øve sig uden frygt for at lave fejl i kassen.",
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
        {/* Hero — Z-pattern */}
        <section className="bg-soft" aria-labelledby="intro">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-sm text-sm font-medium mb-4">
                Nyt i FlexPOS
              </span>
              <h1 id="intro" tabIndex={-1} className="text-4xl sm:text-5xl lg:text-6xl text-primary scroll-mt-24 focus:outline-none">
                Gør FlexPOS oplæringen tryg og ensartet
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-foreground/80 leading-relaxed">
                Oplev vores nye indbyggede onboarding. Et sikkert testmiljø,
                hvor nye medarbejdere og frivillige kan lære systemet at kende
                i deres eget tempo, helt uden frygt for at lave fejl i kassen.
                Prøv{" "}
                <Link to="/prototypen" className="text-primary underline underline-offset-4 hover:opacity-80 font-medium">
                  den interaktive prototype
                </Link>{" "}
                og se hvordan det fungerer.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/prototypen"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:opacity-90 focus-visible:outline-offset-4 shadow-md"
                >
                  Prøv den interaktive prototype
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-md bg-white shadow-lg border border-soft overflow-hidden flex items-center justify-center">
                <img
                  src="/flexpos-mockup.webp"
                  alt="UI mockup af FlexPOS kassesystem med interaktive hotspots til oplæring"
                  width={1920}
                  height={1299}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm font-semibold shadow">
                Sandbox-miljø
              </div>
            </div>
          </div>
        </section>

        {/* Value props — F-pattern */}
        <section className="bg-background" aria-labelledby="fordele">
          <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
            <div className="max-w-2xl mb-12">
              <h2 id="fordele" tabIndex={-1} className="text-3xl sm:text-4xl text-primary scroll-mt-24 focus:outline-none">
                En tryggere hverdag i kassen
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                Tre konkrete fordele, der hjælper jeres nye brugere godt fra
                start, uanset om de er frivillige eller fastansatte.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Træn i sikre rammer",
                  text: "Et isoleret sandbox-miljø, hvor nye frivillige og medarbejdere kan øve salg og rabatter, helt uden at det registreres i den rigtige kasse.",
                },
                {
                  Icon: Clock,
                  title: "Oplæring i eget tempo",
                  text: "Start et guidet læringsflow præcis når der er tid og ro i butikken, så nye brugere kan klikke sig trygge i deres eget tempo.",
                },
                {
                  Icon: HandHeart,
                  title: "En hjælpende hånd i hverdagen",
                  text: "Få nye folk godt og sikkert fra start, så de føler sig selvhjulpne – også selvom butikkens faste superbruger ikke lige er på vagt.",
                },
              ].map(({ Icon, title, text }) => (
                <article
                  key={title}
                  className="bg-softer p-6 rounded-sm border-l-4 border-primary hover:shadow-md transition-shadow"
                >
                  <Icon
                    size={36}
                    className="text-primary mb-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl text-primary mb-2">{title}</h3>
                  <p className="text-foreground/80 leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="bg-soft" aria-labelledby="citat">
          <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
            <h2 id="citat" tabIndex={-1} className="sr-only scroll-mt-24 focus:outline-none">Citat</h2>
            <figure className="bg-white p-8 lg:p-12 rounded-sm shadow-sm border-l-4 border-accent relative">
              <Quote
                size={48}
                className="text-accent/40 absolute top-4 right-6"
                aria-hidden="true"
              />
              <blockquote className="text-xl lg:text-2xl text-primary leading-relaxed font-medium">
                "Man skal vende perspektivet fra at se på, hvad organisationens
                behov er, til at tage afsæt i, hvad brugernes behov er."
              </blockquote>
              <figcaption className="mt-6 text-foreground/70 font-medium">
                – Astrid Haug
              </figcaption>
            </figure>
          </div>
        </section>



        {/* Bottom CTA */}
        <section className="bg-background" aria-labelledby="kom-i-gang">
          <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20 text-center">
            <h2 id="kom-i-gang" tabIndex={-1} className="text-3xl sm:text-4xl text-primary scroll-mt-24 focus:outline-none">
              Klar til at se det i praksis?
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Tag det næste skridt – prøv prototypen eller dyk ned i
              opsætningsguiden.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
              <Link
                to="/prototypen"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:opacity-90 shadow-md"
              >
                Test onboarding-flowet (Prototype)
              </Link>
              <Link
                to="/designguiden"
                className="inline-flex items-center gap-2 text-primary px-6 py-3 rounded-sm font-medium underline underline-offset-4 hover:opacity-80"
              >
                Se opsætningsguiden (For Amero-medarbejdere)
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
