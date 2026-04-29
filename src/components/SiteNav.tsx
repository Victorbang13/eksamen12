import { Link } from "@tanstack/react-router";

const linkClass =
  "px-3 py-2 text-sm font-medium rounded-sm hover:underline underline-offset-4";

export function SiteNav() {
  return (
    <header className="bg-primary on-primary text-primary-foreground">
      <a href="#main" className="skip-link">Spring til indhold</a>
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between flex-wrap gap-2">
        <Link to="/" className="text-lg font-bold tracking-wide">
          AMERO
        </Link>
        <nav aria-label="Hovednavigation">
          <ul className="flex gap-1 sm:gap-2">
            <li>
              <Link
                to="/"
                className={linkClass}
                activeOptions={{ exact: true }}
                activeProps={{ className: `${linkClass} underline` }}
              >
                Forside
              </Link>
            </li>
            <li>
              <Link
                to="/prototypen"
                className={linkClass}
                activeProps={{ className: `${linkClass} underline` }}
              >
                Prototypen
              </Link>
            </li>
            <li>
              <Link
                to="/designguiden"
                className={linkClass}
                activeProps={{ className: `${linkClass} underline` }}
              >
                OBdesignguiden
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary on-primary text-primary-foreground mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm">
        © {new Date().getFullYear()} AMERO — FlexPOS Onboarding
      </div>
    </footer>
  );
}
