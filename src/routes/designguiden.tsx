import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";


const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9æøå\s-]/g, "")
    .replace(/\s+/g, "-");

export const Route = createFileRoute("/designguiden")({
  head: () => ({
    meta: [
      { title: "Designguiden — AMERO" },
      {
        name: "description",
        content:
          "Digital design manual for OB / AMERO — skabelon til retningslinjer og elementer.",
      },
      { property: "og:title", content: "Designguiden — AMERO" },
      {
        property: "og:description",
        content: "Skabelon til den digitale design manual.",
      },
    ],
  }),
  component: Designguide,
});

const sections = [
  "Dos and Don'ts",
  "Brug af elementer",
  "Afstande og komposition",
  "Farver",
  "Tone of voice",
];

function Designguide() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <section className="bg-soft" aria-labelledby="intro">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 id="intro" tabIndex={-1} className="text-4xl sm:text-5xl text-primary scroll-mt-24 focus:outline-none">
              Designguiden
            </h1>
            <p className="mt-4 text-lg max-w-2xl">
              Digital design manual — en skabelon til retningslinjer for
              brugen af brand-elementerne.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
          {sections.map((title, i) => (
            <section
              key={title}
              aria-labelledby={slug(title)}
              className="bg-grey p-8 rounded-sm border border-primary/10"
            >
              <h2
                id={slug(title)}
                tabIndex={-1}
                className="text-2xl text-primary border-b border-primary/20 pb-3 scroll-mt-24 focus:outline-none"
              >
                {`${i + 1}. ${title}`}
              </h2>
              <div className="mt-6 min-h-40 flex items-center justify-center text-sm opacity-60 italic">
                Placeholder — indhold tilføjes senere.
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
