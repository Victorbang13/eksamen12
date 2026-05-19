import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AMERO — FlexPOS Onboarding" },
      { name: "description", content: "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet." },
      { name: "author", content: "AMERO" },
      { property: "og:title", content: "AMERO — FlexPOS Onboarding" },
      { property: "og:description", content: "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "AMERO — FlexPOS Onboarding" },
      { name: "twitter:description", content: "Et intuitivt onboarding-flow til FlexPOS, der gør oplæringen tryg og ensartet." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01e91c96-c04b-49c6-8051-277aec1977cd/id-preview-54ac0882--09c70f18-fdc2-4f90-91dd-60032b403648.lovable.app-1779003099775.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/01e91c96-c04b-49c6-8051-277aec1977cd/id-preview-54ac0882--09c70f18-fdc2-4f90-91dd-60032b403648.lovable.app-1779003099775.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
