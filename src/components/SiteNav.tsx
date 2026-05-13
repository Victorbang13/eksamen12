import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Star, Menu, X, ArrowRight } from "lucide-react";

const navLinkClass =
  "px-3 py-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors";
const navLinkActiveClass =
  "px-3 py-2 text-sm font-medium text-primary border-b-2 border-accent";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <a href="#main" className="skip-link">
        Spring til indhold
      </a>

      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Phone size={12} aria-hidden="true" />
              77 34 34 80
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail size={12} aria-hidden="true" />
              support@amero.dk
            </span>
            <span className="opacity-80">Vidensunivers</span>
            <span className="opacity-80">Supportunivers</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <span className="inline-flex text-accent" aria-hidden="true">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
            </span>
            <span>+4,8 rating på Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-background border-b border-soft shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-primary"
          >
            Amero
          </Link>

          <nav
            aria-label="Hovednavigation"
            className="hidden md:flex items-center gap-1"
          >
            <Link
              to="/"
              className={navLinkClass}
              activeOptions={{ exact: true }}
              activeProps={{ className: navLinkActiveClass }}
            >
              Forside
            </Link>
            <Link
              to="/prototypen"
              className={navLinkClass}
              activeProps={{ className: navLinkActiveClass }}
            >
              Prototypen
            </Link>
            <Link
              to="/designguiden"
              className={navLinkClass}
              activeProps={{ className: navLinkActiveClass }}
            >
              Designguiden
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/prototypen"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              Prøv prototypen
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-primary"
            aria-label={open ? "Luk menu" : "Åbn menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            aria-label="Mobilnavigation"
            className="md:hidden border-t border-soft bg-background"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              <li>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-primary font-medium"
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className:
                      "block px-3 py-2 text-primary font-medium bg-soft rounded-sm",
                  }}
                >
                  Forside
                </Link>
              </li>
              <li>
                <Link
                  to="/prototypen"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-primary font-medium"
                  activeProps={{
                    className:
                      "block px-3 py-2 text-primary font-medium bg-soft rounded-sm",
                  }}
                >
                  Prototypen
                </Link>
              </li>
              <li>
                <Link
                  to="/designguiden"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-primary font-medium"
                  activeProps={{
                    className:
                      "block px-3 py-2 text-primary font-medium bg-soft rounded-sm",
                  }}
                >
                  Designguiden
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/prototypen"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium text-sm"
                >
                  Prøv prototypen
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>
        )}
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
