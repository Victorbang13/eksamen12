## Mål
Lave headeren i `src/components/SiteNav.tsx` om så den visuelt minder om amero.dk's header.

## Struktur (to rækker)

**1. Top utility-bar** (mørk navy baggrund, lille tekst)
- Venstre: telefon "77 34 34 80" + e-mail "support@amero.dk" + links "Vidensunivers", "Supportunivers" (rene visuelle elementer — ingen rigtige links bag, da projektet ikke har de sider)
- Højre: lille "★★★★★ +4,8 rating på Trustpilot" tekst

**2. Hovedbar** (hvid baggrund, navy tekst)
- Venstre: "Amero" wordmark som logo (Link til "/")
- Midte: navigation — Forside, Prototypen, Designguiden (samme routes som i dag)
- Højre: en primær CTA-knap i Amero-blå "Prøv prototypen" → linker til `/prototypen`

## Visuelt
- Top-bar: `bg-primary` (eksisterende navy), lille tekst, ~32px høj
- Hoved-bar: hvid baggrund, navy tekst, skygge under, sticky (`sticky top-0 z-50`)
- Logo i fed serif/sans, navy farve
- CTA-knap: afrundet, accent/primær farve
- Mobile: top-bar collapser; hoved-nav bliver hamburger-menu (simpel toggle)

## Tekniske detaljer
- Kun `src/components/SiteNav.tsx` ændres
- Genbrug eksisterende design tokens (primary, accent, foreground) — ingen nye farver i komponenten
- Behold `skip-link` for tilgængelighed
- Behold `activeProps` på navigationslinks
- Mobile menu: enkel `useState` toggle uden ny dependency

## Out of scope
- Footer (`SiteFooter`) ændres ikke
- Ingen nye routes / sider
- Ingen rigtig integration til Trustpilot — kun visuel pendant