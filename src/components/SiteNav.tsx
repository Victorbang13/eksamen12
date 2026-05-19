import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Star, Menu, X, ArrowRight } from "lucide-react";

const navLinkClass =
  "px-4 py-2 text-[15px] font-normal text-primary hover:text-accent transition-colors";
const navLinkActiveClass =
  "px-4 py-2 text-[15px] font-normal text-accent";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <a href="#main" className="skip-link">
        Spring til indhold
      </a>

      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-[13px] hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Phone size={13} aria-hidden="true" />
              42 18 76 09
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={13} aria-hidden="true" />
              support@åmero.dk
            </span>
            <span>Vidensunivers</span>
            <span>Supportunivers</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex gap-0.5" style={{ color: "#00B67A" }} aria-hidden="true">
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
              <Star size={13} fill="currentColor" strokeWidth={0} />
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
            className="text-[28px] font-bold text-primary leading-none"
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
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-md font-semibold text-[15px] hover:opacity-90 transition-opacity"
            >
              Prøv prototypen
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
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm space-y-2">
        <p>© {new Date().getFullYear()} AMERO — FlexPOS Onboarding</p>
        <p className="opacity-80">
          Denne hjemmeside er udelukkende lavet til skolebrug og repræsenterer ikke Amero.
        </p>
      </div>
    </footer>
  );
}
