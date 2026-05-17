# Plan: Indsæt designguide-indhold på /designguiden

Erstat den nuværende placeholder-struktur i `src/routes/designguiden.tsx` med det rigtige indhold opdelt i 5 sektioner. Hver sektion får tekst (overskrifter, brødtekst, Do's & Don'ts hvor relevant) og én eller flere tomme billedebokse, hvor du senere kan indsætte billeder.

## Sektioner og struktur

1. **Brug af elementer (Atomic Design)**
   - Intro-tekst om Atomic Design og de tre komponenter
   - Do/Don't-blok
   - Undersektioner med hver sin billedeboks:
     - Hotspot (tekst + billedeboks)
     - Opgaveoversigten (tekst + billedeboks)
     - Flow Bibliotek (tekst + billedeboks)
   - + en oversigts-billedeboks øverst til Atomic Design-illustration

2. **Farver & Kontraster**
   - Intro om WCAG 2.1 og 4.5:1 kontrast
   - Farveliste vist som swatches (mørkeblå, lyseblå, sart lyseblå, helt sart lyseblå, lysegrå, hvid, mørkegrå) med HEX-koder
   - Do/Don't-blok
   - Billedeboks (fx eksempel på farveanvendelse)

3. **Afstande og Komposition**
   - Tekst om gestalt og negativ rum
   - Do/Don't-blok
   - Billedeboks

4. **Tone of Voice & UX Writing**
   - Intro-tekst om BWC
   - Tabel med Karakteristika / Beskrivelse / Do / Don't (Betryggende, Pædagogisk, Imødekommende)
   - Billedeboks

5. **Typografi**
   - Tekst om 16px/1rem basis, linjeafstand 1.5
   - Do/Don't-blok
   - Billedeboks

## Genbrugelige byggesten (lokalt i filen)

- `ImageBox` — tom ramme (dashed border, `bg-grey/50`, fast aspect-ratio fx 16/9, centreret "Tilføj billede"-label). Bruges som pladsholder hvor du senere indsætter billeder.
- `DoDontList` — to kolonner (Do / Don't) med liste-items, brugt konsistent på tværs af sektioner.
- `ColorSwatch` — lille kort med farveprøve + navn + HEX.

## Filer

- Rediger kun `src/routes/designguiden.tsx`. Behold `SiteNav`, `SiteFooter`, hero-sektion og slug-anker-id'er (så h2-overskrifterne stadig kan tab-fokuseres). Erstat `sections`-arrayet og dets `.map()` med de 5 konkrete sektioner ovenfor.
- Ingen ændringer i routing, styles eller andre filer. Bruger eksisterende design tokens (`text-primary`, `bg-grey`, `bg-soft`, `border-primary/10` osv.).

## Tekstindhold

Brug ordret den tekst, du har leveret i beskeden, til intro, Do/Don't og tabel. Bevar nummerering 1–5 i h2-overskrifterne.
