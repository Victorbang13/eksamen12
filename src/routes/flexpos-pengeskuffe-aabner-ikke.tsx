import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/flexpos-pengeskuffe-aabner-ikke")({
  head: () => ({
    meta: [
      { title: "FlexPOS pengeskuffe åbner ikke — fejlfinding | AMERO" },
      {
        name: "description",
        content:
          "Pengeskuffen åbner ikke i FlexPOS? Følg denne tjekliste til hurtig fejlfinding af kabler, drivere og indstillinger.",
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
        <section className="bg-soft">
          <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
              Fejlfinding
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl text-primary">
              FlexPOS pengeskuffe åbner ikke
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Denne side er under opbygning. Her samler vi snart en praktisk
              tjekliste til at fejlfinde pengeskuffen i FlexPOS – fra kabler og
              strøm til printer-drivere og kasseindstillinger.
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
