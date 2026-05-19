## Mål
Berig de eksisterende sektioner på `/designguiden` med tekniske detaljer og kopierbare kodestumper, så siden fungerer som en praktisk front-end styleguide. Layout, tema, sektionsstruktur og eksisterende indhold bevares 1:1 — der tilføjes kun nye tekniske lag.

## Nye genbrugelige komponenter (i `src/routes/designguiden.tsx`)

- **`CodeBlock`** — pæn kodeboks med mørk baggrund (`bg-primary`), monospace font, "Kopiér"-knap øverst til højre (bruger `navigator.clipboard.writeText`), valgfri sprog-label. Stylet så den passer ind i den eksisterende `bg-grey` / `border-primary/15` æstetik.
- **`StatusSwatch`** — lille kort der viser et statusfarvepar (tekst-hex + baggrund-hex) som et reelt eksempel ("Success-besked") plus de to HEX-værdier monospace nedenunder.

Ingen nye filer, ingen ændringer i `styles.css`, ingen ændringer i andre routes.

## Sektion 2 — Farver & Kontraster (tilføjelser)

Under den eksisterende `ColorSwatch`-grid tilføjes:

1. **Design Tokens kodeblok** (`CodeBlock` med CSS):
   ```css
   :root {
     --color-primary: #233d68;
     --color-secondary: #4faed1;
     --color-ui-gray: #626262;
     --bg-light-blue: #f0f8ff;
     --bg-light-gray: #f7f7f7;
     --bg-white: #ffffff;
   }
   ```

2. **Statusfarver** — ny undersektion "Statusfarver" med fire `StatusSwatch`-kort i et 2- eller 4-kolonne grid: Success (#4CAF50 / #CEFFD1), Warning (#D38A33 / #FFF8B9), Error (#D32F2F / #FFDADA), Info (#4FAED1 / #E5F6FD). Efterfulgt af en `CodeBlock` med tilsvarende CSS-variabler (`--color-success-text`, `--color-success-bg`, osv.).

Den eksisterende `DoDontList` for farver bevares uændret nederst.

## Sektion 5 — Typografi (tilføjelser)

Mellem den eksisterende brødtekst og `ImageBox` (typografi-hierarki) tilføjes:

1. **Font weights** — kort visuel liste med tre linjer "Roboto Regular 400 / Medium 500 / Bold 700", hver renderet i den faktiske vægt.
2. **CSS kodeblok**:
   ```css
   p {
     font-size: 1rem;        /* 16px basis */
     line-height: 1.5;
     font-family: "Roboto", system-ui, sans-serif;
   }
   ```
3. **Kort note** om at WCAG kræver `rem` / relative enheder for 200% zoom — refererer til den eksisterende Do/Don't (ingen duplikering).

Eksisterende tekst, billede og `DoDontList` bevares.

## Sektion 1 — Brug af elementer / Atomic Design (tilføjelser)

Under "Hotspot"-underafsnittet (det eneste klart interaktive element med knap-natur, der allerede er beskrevet) tilføjes en **Code Snippet-boks** med HTML + CSS for en standard primær-knap, der matcher Ameros stil:

```html
<button class="btn-primary">Næste</button>
```
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--bg-white);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover  { background: #1a2f50; }
.btn-primary:active { background: #142540; }
.btn-primary:focus  { outline: 3px solid var(--color-secondary); outline-offset: 2px; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
```

Efterfulgt af en kort linje der ekspliciterer de fire states: `:hover`, `:active`, `:focus`, `:disabled`.

Alle eksisterende tekster, `FlowBibliotekEmbed`, `DoDontList`, `ImageBox`'es (Hotspot, Opgaveoversigt, Flow-bibliotek) bevares uændret.

## Hvad der IKKE ændres

- Layout, sticky-nav, sidebar, sektionsrækkefølge, farver, fonte, billeder, tabeller, eksisterende tekstindhold, `SiteNav`, `SiteFooter`, `styles.css`, andre routes.
- Eksisterende Do/Don't-lister får ingen edits.
