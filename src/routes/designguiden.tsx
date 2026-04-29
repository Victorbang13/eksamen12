import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/designguiden")({
  head: () => ({
    meta: [
      { title: "OBdesignguiden — AMERO" },
      {
        name: "description",
        content:
          "Digital design manual for OB / AMERO — skabelon til retningslinjer og elementer.",
      },
      { property: "og:title", content: "OBdesignguiden — AMERO" },
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
  "Tonalitet",
];

function Designguide() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <section className="bg-soft">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="text-4xl sm:text-5xl text-primary">
              OBdesignguiden
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
              aria-labelledby={`section-${i}`}
              className="bg-grey p-8 rounded-sm border border-primary/10"
            >
              <h2
                id={`section-${i}`}
                className="text-2xl text-primary border-b border-primary/20 pb-3"
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
