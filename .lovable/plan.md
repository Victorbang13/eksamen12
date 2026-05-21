Scoren var 98 / 95 / 96 / 100 (Performance / Accessibility / Best Practices / SEO) før mine seneste rettelser. Nedenfor er hver kategori opdelt i "jeg kan fikse" og "du skal fikse".

## Jeg kan fikse i koden

### Accessibility — kontrast (95 → 100)
- Den aktive navigations-link i `SiteNav` bruger `!text-[#4FAED1]` på hvid baggrund (~2.5:1, fejler). Skift til mørkeblå/primær eller en mørkere accent.
- Sandbox-badgen på forsiden (`bg-accent text-primary`) flaggedes også — øg kontrast ved fx at bruge `bg-primary text-primary-foreground` eller en mørkere variant.

### Performance — billeder og LCP
- `amero-logo.png` vises som 177×40, men filen er 1200×271 (~23 KiB). Generér en mindre logo-variant (eller skifter til SVG) og tilføj eksplicit `width`/`height` for at fjerne CLS-bidraget.
- Unsplash hero-billedet hentes i 900×675 men vises i 702×469. Sænk `w=` parameteren og tilføj `width`/`height`.
- LCP-billedet (hero) mangler `fetchpriority="high"` og bør ikke have `loading="lazy"`. Begge dele rettes i `src/routes/index.tsx`.

### Performance — preconnect
- Tilføj `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` i `__root.tsx` (~80 ms LCP-besparelse).

### Best Practices — woff2 404
- Én af Roboto-woff2-URL'erne i `src/styles.css` returnerer 404. Tjek og udskift med en gyldig Google Fonts v47-URL (eller skift til `<link>` mod fonts.googleapis.com).

## Du skal selv håndtere

### Best Practices — HTTP-sikkerhedsheaders
Disse kræver server-/platform-konfiguration, ikke kodeændring i appen:
- **CSP** (Content-Security-Policy) — ingen header fundet.
- **HSTS** med `preload` — ingen header fundet.
- **COOP** (Cross-Origin-Opener-Policy) — ingen header fundet.
- **X-Frame-Options / frame-ancestors** — ingen header fundet.
- **Trusted Types** (`require-trusted-types-for`) i CSP — ingen header fundet.

Lovable's published hosting eksponerer ikke i dag custom response headers — det er en platform-/infrastruktur-beslutning. Hvis du vil have dem, skal du enten:
1. Bede Lovable-support tilføje headers på dit `.lovable.app`/custom domain, eller
2. Sætte dit eget custom domain bag en CDN (fx Cloudflare) hvor du selv kan styre headers.

### Performance — cache TTL
- `/~flock.js` har 25 min cache. Det er Lovables egen analytics-fil — du kan ikke ændre den.

### "Reduce unused JavaScript / 3rd party"
- Største bidragsydere er `chrome-extension://...` (din egen browsers ad-blocker mv.). Det påvirker kun din test, ikke rigtige brugere. Du kan ignorere — eller køre testen i incognito uden extensions for et renere resultat.

### Manuel SEO/A11y-check
Lighthouse markerer ting der kun kan tjekkes manuelt (logisk tab-rækkefølge, focus-trap, structured data validering osv.). Det er ikke fejl — bare en påmindelse om at teste manuelt.

## Foreslået rækkefølge når du godkender
1. Kontrast-fixes i `SiteNav` og forsidens badge.
2. Logo: byt til mindre fil + sæt `width`/`height`.
3. Hero: sænk Unsplash-størrelse, fjern `loading="lazy"`, tilføj `fetchpriority="high"` + `width`/`height`.
4. Preconnect til `fonts.gstatic.com`.
5. Find og udskift den 404'ende Roboto-woff2.
