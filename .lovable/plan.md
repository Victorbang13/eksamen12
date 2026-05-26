# Standalone HTML-version af prototype-siden

Lav én selvstændig fil `public/prototypen.html` der gengiver `/prototypen`-siden i ren HTML + CSS + en lille smule vanilla JS til fullscreen-knappen. Filen kan åbnes direkte i en browser eller hostes som statisk fil — helt løsrevet fra React, TanStack Router og Tailwind.

## Indhold i filen

1. **`<head>`**
   - `<title>` og `<meta description>` matchende den nuværende route.
   - `<link rel="preconnect">` til Figmas domæner (samme som i dag) for hurtigere iframe-load.
   - Inline `<style>` med al CSS — ingen eksterne stylesheets, så filen er 100% selvbærende.

2. **`<body>`**
   - Simpel header med titel "Prototypen" og introtekst (samme tekst som routen).
   - Et hvidt kort der wrapper iframen, med samme look: `border-radius`, blød skygge, padding.
   - Aspect-ratio-wrapper (padding-bottom 60%) der holder iframens højde proportional med bredden.
   - `<iframe>` med samme Figma-URL, `scrolling="no"`, `allowfullscreen`, `loading="eager"`.
   - Fullscreen-knap øverst i kortet — vises kun under 768px via `@media (max-width: 767px)`.
   - Afsluttende CTA-sektion med link til designguiden (kan pege på `/designguiden` eller udelades — se note).

3. **`<script>`** (få linjer vanilla JS)
   - Klik på fullscreen-knappen kalder `container.requestFullscreen()`.
   - `fullscreenchange`-listener opdaterer knappens label/ikon og toggler en CSS-klasse på containeren (så CSS kan skifte til fixed/inset-0 hvis Fullscreen API fejler).
   - Try/catch-fallback der toggler klassen manuelt hvis API'et ikke er tilgængeligt (Safari iOS).

## Styling-strategi

- Brug samme farver som i `src/styles.css` (hvid baggrund, mørk primær til CTA-sektion) — hardcodes som hex i den standalone fil siden den ikke deler design tokens.
- Skygge: `box-shadow: 0 10px 30px rgba(0,0,0,0.1)` (samme som i React-versionen).
- Knap-ikoner: brug inline SVG (maximize/minimize fra Lucide) for at undgå eksterne afhængigheder.
- Font: system-font-stack så filen ikke kræver Google Fonts.

## Hvor filen lægges

`public/prototypen.html` — filer i `public/` serves som-de-er af Vite/Cloudflare, så den vil være tilgængelig på `https://vbstudio.dk/prototypen.html`. Den eksisterende `/prototypen`-route i React forbliver uændret.

## Hvad der IKKE ændres

- Selve `/prototypen`-routen i React-projektet røres ikke.
- Ingen ændringer i navigation, SiteNav eller andre routes.
- Figma-prototypen selv er stadig en iframe — den kan ikke laves om til HTML/CSS.

## Note til dig

Skal CTA'en nederst i den standalone fil linke tilbage til `/designguiden` (på det publicerede site), til en tilsvarende standalone `designguiden.html`, eller helt udelades? Default i planen: link til `/designguiden` på det publicerede domæne. Sig til hvis du foretrækker noget andet.
