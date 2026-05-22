import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/hvordan-laver-man-retur-i-flexpos")({
  head: () => ({
    meta: [
      { title: "Hvordan laver man retur i FlexPOS? — AMERO" },
      {
        name: "description",
        content:
          "Sådan gennemfører du en retur i FlexPOS korrekt – med tydelige trin, så både kasse og kunde stemmer.",
      },
      { property: "og:title", content: "Hvordan laver man retur i FlexPOS? — AMERO" },
      {
        property: "og:description",
        content:
          "En enkel og pålidelig vejledning til at lave retur i FlexPOS-kassesystemet.",
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
              Hvordan laver man retur i FlexPOS?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Denne side er under opbygning. Her finder du snart en trin-for-trin
              vejledning til, hvordan en retur registreres korrekt i FlexPOS –
              så kassen altid stemmer ved dagens afslutning.
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
