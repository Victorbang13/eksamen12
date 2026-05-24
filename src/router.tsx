// Router-opsætning til TanStack Start.
// Denne fil eksporterer `getRouter`, som SSR- og klient-entrypoint kalder
// for at få den samme router-instans i begge miljøer.
import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Default error-boundary som vises hvis en route eller dens loader kaster
 * en uventet fejl. Vises som fallback hvis route'n ikke selv har sat
 * `errorComponent`.
 */
function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  // useRouter giver os adgang til router-instansen, så vi kan kalde
  // `invalidate()` og re-køre loaders ved retry.
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        {/* Advarsels-ikon (inline SVG for at undgå ekstra dependency) */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        {/* Vis kun den tekniske fejlbesked i development — ikke i produktion. */}
        {import.meta.env.DEV && error.message && (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              // Re-kør alle loaders i den aktive route-træ-gren …
              router.invalidate();
              // … og nulstil selve error-boundary'en så children renderes igen.
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Factory der opretter en ny router-instans pr. request på serveren og én
 * gang i browseren. TanStack Start kalder denne automatisk.
 */
export const getRouter = () => {
  const router = createRouter({
    routeTree, // auto-genereret af router-pluginnet ud fra src/routes/
    context: {}, // ingen delt context (fx queryClient) i dette projekt
    scrollRestoration: true, // genopret scroll-position ved tilbage-navigation
    defaultPreloadStaleTime: 0, // preload-data anses altid som "stale" og hentes igen
    defaultErrorComponent: DefaultErrorComponent, // fælles fallback for uventede fejl
  });

  return router;
};
