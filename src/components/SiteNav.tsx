// Global site-navigation og footer brugt på alle sider.
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Star, Menu, X, ArrowRight } from "lucide-react";
import ameroLogo from "@/assets/amero-logo.webp";
import { CarbonBadge } from "@/components/CarbonBadge";


// Fælles styling for nav-links i desktop-navigationen.
// Defineret som konstanter for at undgå gentagelse og sikre konsistens.
const navLinkClass =
  "px-4 py-2 text-[15px] font-semibold text-black hover:text-primary transition-colors";
// Styling der lægges oven på `navLinkClass` når linket peger på den aktive route.
const navLinkActiveClass =
  "px-4 py-2 text-[15px] font-semibold !text-primary underline underline-offset-8 decoration-2";

/**
 * Sticky header med top-bar (kontaktinfo), logo, hovednavigation og
 * mobil-burgermenu. Renderes øverst på alle sider.
 */
export function SiteNav() {
  // Styrer om mobil-menuen er foldet ud eller ej.
  const [open, setOpen] = useState(false);

  return (
    // `sticky top-0` holder headeren synlig når brugeren scroller.
    // `z-50` sikrer at den ligger over sideindholdet.
    <header className="sticky top-0 z-50">
      {/* Skip-link til tastaturbrugere: springer forbi nav direkte til hovedindhold. */}
      <a href="#main" className="skip-link">
        Spring til indhold
      </a>

      {/* Øverste utility-bar med telefon, mail og Trustpilot — kun på desktop. */}
      <div className="bg-primary text-primary-foreground text-[13px] hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              {/* aria-hidden: ikonet er rent dekorativt, telefonnummeret læses op af skærmlæser. */}
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
            {/* Trustpilot-stjerner — farven er hardcoded fordi den er en del af Trustpilots brand. */}
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

      {/* Hovedbar med logo, navigation og CTA-knap. */}
      <div className="bg-background border-b border-soft shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo linker altid tilbage til forsiden. */}
          <Link
            to="/"
            className="leading-none"
            aria-label="Amero – forside"
          >
            <img
              src={ameroLogo}
              alt="Amero logo"
              // Eksplicit width/height undgår layout-shift (CLS) når billedet loader.
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop-navigation — skjult på mobil. */}
          <nav
            aria-label="Hovednavigation"
            className="hidden md:flex items-center gap-1"
          >
            <Link
              to="/"
              className={navLinkClass}
              // `exact: true` sikrer at "Forside" kun er aktiv på "/", ikke på alle ruter.
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

          {/* Primær CTA — kun synlig på desktop, mobil får sin egen i menuen. */}
          <div className="hidden md:block">
            <Link
              to="/prototypen"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold text-[15px] hover:opacity-90 transition-opacity"
            >
              Prøv prototypen
            </Link>
          </div>

          {/* Burger-knap som åbner/lukker mobil-menuen. */}
          <button
            type="button"
            className="md:hidden p-2 text-primary"
            // aria-label opdateres ud fra state så skærmlæser ved om menuen er åben.
            aria-label={open ? "Luk menu" : "Åbn menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobil-menu — vises kun når `open` er true. */}
        {open && (
          <nav
            aria-label="Mobilnavigation"
            className="md:hidden border-t border-soft bg-background"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              <li>
                <Link
                  to="/"
                  // Luk menuen automatisk efter klik så brugeren ser den nye side.
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
              {/* CTA i bunden af mobil-menuen — pendant til desktop-knappen. */}
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

/**
 * Global footer renderet på alle sider. Indeholder copyright og en
 * disclaimer om at sitet er et skoleprojekt og ikke repræsenterer Amero.
 */
export function SiteFooter() {
  return (
    <footer className="bg-primary on-primary text-primary-foreground mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm space-y-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          {/* Årstal beregnes dynamisk så footeren altid er aktuel. */}
          <p>© {new Date().getFullYear()} AMERO — FlexPOS Onboarding</p>
          <p className="opacity-80">
            Denne hjemmeside er udelukkende lavet til skolebrug og repræsenterer ikke Amero.
          </p>
        </div>
        {/* Carbon Badge fra websitecarbon.com — viser sidens CO2-aftryk. */}
        <CarbonBadge />

      </div>
    </footer>
  );
}
