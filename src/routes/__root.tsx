// Root-route i TanStack Start. Definerer HTML-skelet (html/head/body),
// globale <head>-tags (meta, OG, JSON-LD) samt 404-side.
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

// `?url` returnerer Vite-genereret URL til den buildede CSS-fil
// så vi kan linke den fra <head> uden at importere CSS som modul.
import appCss from "../styles.css?url";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

/**
 * 404-komponent der vises når brugeren navigerer til en ukendt URL.
 * Genbruger SiteNav/SiteFooter for at bevare et konsistent layout.
 */
function NotFoundComponent() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <section className="bg-soft" aria-labelledby="nf-title">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/70">Fejl 404</p>
            <h1
              id="nf-title"
              // tabIndex={-1} så vi programmatisk kan flytte fokus hertil ved navigation.
              tabIndex={-1}
              className="mt-4 text-6xl sm:text-7xl text-primary scroll-mt-24 focus:outline-none"
            >
              Siden findes ikke
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
              Vi kunne ikke finde den side, du ledte efter. Den er måske flyttet, eller linket kan være forkert.
              Bare rolig — du kan altid gå tilbage til forsiden.
            </p>
            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Gå til forsiden
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

// Root-route konfiguration — alle øvrige routes nedarver fra denne.
export const Route = createRootRoute({
  // `head()` returnerer meta/links/scripts som injiceres i <head> på alle sider.
  // Leaf-routes kan tilføje eller overskrive enkelte felter (fx title).
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      // Responsive viewport — pligtigt for mobil.
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Bed søgemaskiner om IKKE at indeksere sitet (skoleprojekt).
      { name: "robots", content: "noindex" },
      // Verifikations-token til Google Search Console.
      { name: "google-site-verification", content: "BTKrALJIqDmOWUru-xl6H4K8dcNySMZoANkg9L9-4F0" },
      // Default titel og beskrivelse — overskrives af leaf-routes.
      { title: "AMERO - FlexPOS Onboarding" },
      { name: "description", content: "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet." },
      { name: "author", content: "AMERO" },
      // Open Graph-tags styrer hvordan linket vises på Facebook/LinkedIn.
      { property: "og:title", content: "AMERO - FlexPOS Onboarding" },
      { property: "og:description", content: "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet." },
      { property: "og:type", content: "website" },
      // Twitter Card-tags styrer hvordan linket vises på X/Twitter.
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "AMERO - FlexPOS Onboarding" },
      { name: "twitter:description", content: "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet." },
      // Delings-billede vist sammen med linket på sociale medier.
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01e91c96-c04b-49c6-8051-277aec1977cd/id-preview-54ac0882--09c70f18-fdc2-4f90-91dd-60032b403648.lovable.app-1779003099775.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01e91c96-c04b-49c6-8051-277aec1977cd/id-preview-54ac0882--09c70f18-fdc2-4f90-91dd-60032b403648.lovable.app-1779003099775.png" },
    ],
    links: [
      // Preconnect/preload sparer ms på første render af Roboto-fonten.
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        href: "https://fonts.gstatic.com/s/roboto/v51/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // Indlæs den buildede stylesheet (Tailwind + design tokens).
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        // JSON-LD structured data — hjælper søgemaskiner med at forstå sitet.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "AMERO",
              url: "https://vbstudio.dk",
              description:
                "AMERO leverer FlexPOS kassesystem med et indbygget onboarding-flow til tryg og ensartet oplæring.",
            },
            {
              "@type": "WebSite",
              name: "AMERO — FlexPOS Onboarding",
              url: "https://vbstudio.dk",
              description:
                "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet.",
            },
          ],
        }),
      },
    ],
  }),
  // `shellComponent` definerer det yderste HTML-skelet (html/body).
  shellComponent: RootShell,
  // `component` er det der renderes inde i shell'en (delt på tværs af sider).
  component: RootComponent,
  // Vises automatisk ved 404.
  notFoundComponent: NotFoundComponent,
});

/**
 * HTML-skelet renderet på serveren (SSR) og hydreret i browseren.
 * Skal indeholde <html>, <head> (med <HeadContent />) og <body> (med <Scripts />).
 */
function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <head>
        {/* Injicerer alle meta/links/scripts defineret i `head()` ovenfor. */}
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Injicerer TanStack Starts klient-bundle og hydration-data. */}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Root-komponent. <Outlet /> er pladsen hvor child-routes (index, prototypen,
 * designguiden, 404 osv.) renderes ind. Uden Outlet ville siden være tom.
 */
function RootComponent() {
  return <Outlet />;
}
