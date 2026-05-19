import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Maximize2, Minimize2, Check, Copy } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import flowBibliotekImg from "@/assets/flow-bibliotek.png";
import hotspotImg from "@/assets/hotspot.png";
import opgaveoversigtImg from "@/assets/opgaveoversigt.png";
import komposition1Img from "@/assets/komposition-1.png";
import komposition2Img from "@/assets/komposition-2.png";
import komposition3Img from "@/assets/komposition-3.png";
import toneOfVoiceImg from "@/assets/tone-of-voice.png";
import typografiImg from "@/assets/typografi.jpg";



function FlowBibliotekEmbed() {
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const iframeSrc =
    "https://embed.figma.com/proto/lJH1sQMRckEgrwtfUsJ69i/Hovedopgave?node-id=116-11874&scaling=scale-down-width&content-scaling=fixed&page-id=116%3A11565&starting-point-node-id=116%3A12251&embed-host=share&hide-ui=1&bg-color=FFFFFF";

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen?.();
        setFullscreen(true);
      } else {
        await document.exitFullscreen?.();
        setFullscreen(false);
      }
    } catch {
      setFullscreen((v) => !v);
    }
  };

  return (
    <div
      ref={containerRef}
      className={
        fullscreen
          ? "fixed inset-0 z-50 bg-white p-2 flex flex-col"
          : "w-full bg-white p-[15px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      }
    >
      <div className="flex justify-end pb-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium"
          aria-label={fullscreen ? "Luk fuld skærm" : "Vis i fuld skærm"}
        >
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {fullscreen ? "Luk fuld skærm" : "Fuld skærm"}
        </button>
      </div>
      <div
        className={
          fullscreen
            ? "relative flex-1 overflow-hidden rounded-lg bg-white"
            : "relative w-full overflow-hidden rounded-lg bg-white"
        }
        style={fullscreen ? undefined : { height: 700 }}
      >
        <iframe
          title="Flow-bibliotek prototype"
          src={iframeSrc}
          scrolling="no"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/designguiden")({
  head: () => ({
    meta: [
      { title: "Designguiden — AMERO" },
      {
        name: "description",
        content:
          "Digital design manual for OB / AMERO — retningslinjer for elementer, farver, komposition, tone of voice og typografi.",
      },
      { property: "og:title", content: "Designguiden — AMERO" },
      {
        property: "og:description",
        content: "Den digitale design manual for AMERO onboarding-flowet.",
      },
    ],
  }),
  component: Designguide,
});

function ImageBox({
  label = "Tilføj billede",
  ratio = "aspect-[16/9]",
  src,
  seed,
  zoomable = false,
}: {
  label?: string;
  ratio?: string;
  src?: string;
  seed?: string;
  zoomable?: boolean;
}) {
  const [zoomed, setZoomed] = useState(false);
  const imageSrc = src ?? (seed ? `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/675` : undefined);

  if (imageSrc) {
    return (
      <>
        <figure className={`${ratio} w-full rounded-sm overflow-hidden border border-primary/15 bg-grey/50`}>
          <img
            src={imageSrc}
            alt={label}
            className={`w-full h-full object-contain ${zoomable ? "cursor-zoom-in" : ""}`}
            loading="lazy"
            onClick={zoomable ? () => setZoomed(true) : undefined}
          />
        </figure>
        {zoomable && zoomed && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-label={`${label} – forstørret`}
          >
            <img src={imageSrc} alt={label} className="max-w-full max-h-full object-contain" />
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`${ratio} w-full rounded-sm border-2 border-dashed border-primary/30 bg-grey/50 flex items-center justify-center text-sm opacity-60 italic`}
      role="img"
      aria-label={label}
    >
      {label}
    </div>

  );
}

function CodeBlock({ code, language = "css" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="relative rounded-sm border border-primary/15 bg-primary text-primary-foreground overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 text-xs font-mono uppercase tracking-wider opacity-80">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 hover:bg-white/20 transition-colors px-2 py-1 text-xs font-medium"
          aria-label="Kopiér kode"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Kopieret" : "Kopiér"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function StatusSwatch({
  name,
  textHex,
  bgHex,
  sample,
}: {
  name: string;
  textHex: string;
  bgHex: string;
  sample: string;
}) {
  return (
    <div className="rounded-sm border border-primary/10 overflow-hidden bg-white">
      <div
        className="px-4 py-5 text-sm font-medium"
        style={{ backgroundColor: bgHex, color: textHex }}
      >
        {sample}
      </div>
      <div className="p-3 text-xs space-y-1">
        <div className="font-medium text-sm">{name}</div>
        <div className="font-mono opacity-70">Tekst: {textHex}</div>
        <div className="font-mono opacity-70">Baggrund: {bgHex}</div>
      </div>
    </div>
  );
}

function DoDontList({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <div className="rounded-sm border border-primary/15 p-5 bg-white/40">
        <h4 className="font-semibold text-primary">Gør dette</h4>
        <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed">
          {dos.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-sm border border-primary/15 p-5 bg-white/40">
        <h4 className="font-semibold text-primary">Gør ikke dette</h4>
        <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed">
          {donts.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ColorSwatch({ name, hex, textOn = "light" }: { name: string; hex: string; textOn?: "light" | "dark" }) {
  return (
    <div className="rounded-sm border border-primary/10 overflow-hidden">
      <div
        className="h-20 w-full"
        style={{ backgroundColor: hex, color: textOn === "dark" ? "#FFFFFF" : "#333333" }}
        aria-hidden
      />
      <div className="p-3 text-sm">
        <div className="font-medium">{name}</div>
        <div className="opacity-70 font-mono text-xs">{hex}</div>
      </div>
    </div>
  );
}

function SectionShell({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="bg-grey p-8 rounded-sm border border-primary/10">
      <h2
        id={id}
        tabIndex={-1}
        className="text-2xl text-primary border-b border-primary/20 pb-3 scroll-mt-24 focus:outline-none"
      >
        {`${number}. ${title}`}
      </h2>
      <div className="mt-6 space-y-6 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}

function Designguide() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <section className="bg-soft" aria-labelledby="intro">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h1
              id="intro"
              tabIndex={-1}
              className="text-4xl sm:text-5xl text-primary scroll-mt-24 focus:outline-none"
            >
              Designguiden
            </h1>
            <p className="mt-4 text-lg max-w-2xl">
              Digital design manual — retningslinjer for brugen af brand-elementerne i onboarding-flowet.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside aria-label="Indhold på siden" className="hidden lg:block">
            <nav className="sticky top-32 rounded-sm border border-primary/10 bg-grey p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">På denne side</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { id: "brug-af-elementer", label: "1. Brug af elementer" },
                  { id: "farver-og-kontraster", label: "2. Farver & Kontraster" },
                  { id: "afstande-og-komposition", label: "3. Afstande og Komposition" },
                  { id: "tone-of-voice", label: "4. Tone of Voice" },
                  { id: "typografi", label: "5. Typografi" },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-sm px-2 py-1.5 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-10 min-w-0">
          {/* 1. Brug af elementer */}
          <SectionShell id="brug-af-elementer" number={1} title="Brug af elementer (Atomic Design)">
            <p>
              Generelt set består onboarding-flowet af tre komponenter: hotspot, tekstbokse og opgaveoversigten.
              Elementerne er opbygget ved brug af Atomic Design, hvilket sikrer, at nye flows laves med elementer,
              som består af de samme atomer, molekyler og organismer. Ved at bruge denne opbygning sikrer vi, at det
              kun er teksten til de forskellige flows, der differentierer sig. Det gør det nemt for Amero at genbruge
              elementerne.
            </p>

            <FlowBibliotekEmbed />

            <DoDontList
              dos={[
                "Bevar altid de korrekte proportioner på knapper og pop-ups, og brug de prædefinerede elementer fra komponentbiblioteket for at sikre et konsistent flow.",
              ]}
              donts={[
                "Tilføj ikke nye uautoriserede effekter (som f.eks. drop shadows) til de faste designelementer, og stræk aldrig knapper ud af deres oprindelige proportioner.",
              ]}
            />

            <div className="pt-4 space-y-3">
              <h3 className="text-xl text-primary">Hotspot</h3>
              <p>
                Et hotspot er en god måde at indikere tydeligt, hvad næste step er. Dette komponent bruges til at sikre,
                at brugeren ved, hvad der skal ske, og altid kan læse sig frem til, hvad de skal gøre.
              </p>
              <ImageBox src={hotspotImg} label="Hotspot" />

              <div className="pt-2 space-y-3">
                <h4 className="font-semibold text-primary">Code Snippet — primær knap</h4>
                <p className="text-sm">
                  Den primære knap bruges som "næste step" i hotspot og pop-ups. Byg den med følgende HTML/CSS og brug design tokens fremfor hard-codede HEX-værdier.
                </p>
                <CodeBlock
                  language="html"
                  code={`<button class="btn-primary" type="button">Næste</button>`}
                />
                <CodeBlock
                  language="css"
                  code={`.btn-primary {
  background: var(--color-primary);
  color: var(--bg-white);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  font-family: "Roboto", system-ui, sans-serif;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

/* States */
.btn-primary:hover    { background: #1a2f50; }
.btn-primary:active   { background: #142540; }
.btn-primary:focus-visible {
  outline: 3px solid var(--color-secondary);
  outline-offset: 2px;
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`}
                />
                <p className="text-sm">
                  Knappen skal altid implementere de fire interaktive tilstande:
                  <code className="font-mono mx-1 px-1.5 py-0.5 rounded bg-primary/10">:hover</code>,
                  <code className="font-mono mx-1 px-1.5 py-0.5 rounded bg-primary/10">:active</code>,
                  <code className="font-mono mx-1 px-1.5 py-0.5 rounded bg-primary/10">:focus</code> og
                  <code className="font-mono mx-1 px-1.5 py-0.5 rounded bg-primary/10">:disabled</code> — så brugeren altid får tydelig feedback på sin handling.
                </p>
              </div>
            </div>


            <div className="pt-4 space-y-3">
              <h3 className="text-xl text-primary">Opgaveoversigten</h3>
              <p>
                Oversigten over opgaver er der for at visualisere, hvor langt brugeren er i flowet. Derudover indeholder
                den også en hurtig udvej fra flowet, hvilket er vigtigt for, at brugeren kan føle sig tryg.
              </p>
              <ImageBox src={opgaveoversigtImg} label="Opgaveoversigten" />
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="text-xl text-primary">Flow-bibliotek</h3>
              <p>
                I dette element er der mulighed for at tilføje flere flows. Det åbner muligheden for at oplære i flows,
                som i fremtiden viser sig at kræve oplæring. Elementet er placeret ved login-skærmen, da det ikke bør
                være nødvendigt at være logget ind — flowsne foregår i et sandbox-miljø.
              </p>
              <ImageBox src={flowBibliotekImg} label="Flow-bibliotek" />
            </div>
          </SectionShell>

          {/* 2. Farver & Kontraster */}
          <SectionShell id="farver-og-kontraster" number={2} title="Farver & Kontraster">
            <p>
              For at sikre ekstern konsistens og genkendelighed for brugerne, bygger prototypen udelukkende på Ameros
              officielle farvepalette. Det er afgørende, at disse specifikke HEX-koder overholdes, og at der altid er
              tilstrækkelig kontrast mellem tekst og baggrund. For at overholde webtilgængelighedskravene (WCAG 2.1)
              skal der sikres et minimumskontrastforhold på 4.5:1 for normal tekst.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <ColorSwatch name="Mørkeblå - primær" hex="#233d68" textOn="dark" />
              <ColorSwatch name="Lyseblå (accent)" hex="#4FAED1" />
              <ColorSwatch name="Sart lyseblå" hex="#DCEFF6" />
              <ColorSwatch name="Helt sart lyseblå" hex="#F0F8FF" />
              <ColorSwatch name="Lysegrå" hex="#F7F7F7" />
              <ColorSwatch name="Hvid" hex="#FFFFFF" />
              <ColorSwatch name="Mørkegrå / brødtekst" hex="#333333" textOn="dark" />
            </div>

            <div className="pt-2 space-y-3">
              <h3 className="text-xl text-primary">Design Tokens</h3>
              <p>
                Brug disse CSS-variabler som single source of truth for farver i koden. Definér dem én gang i <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-primary/10">:root</code> og referer altid via <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-primary/10">var(--token)</code>.
              </p>
              <CodeBlock
                language="css"
                code={`:root {
  --color-primary:    #233d68;
  --color-secondary:  #4faed1;
  --color-ui-gray:    #626262;
  --bg-light-blue:    #f0f8ff;
  --bg-light-gray:    #f7f7f7;
  --bg-white:         #ffffff;
}`}
              />
            </div>

            <div className="pt-2 space-y-3">
              <h3 className="text-xl text-primary">Statusfarver</h3>
              <p>
                Statusfarver bruges altid som par (tekst på baggrund) for at sikre tilstrækkelig kontrast og en konsistent feedback-oplevelse på tværs af flowet.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <StatusSwatch name="Success" textHex="#4CAF50" bgHex="#CEFFD1" sample="Ændringerne er gemt" />
                <StatusSwatch name="Warning" textHex="#D38A33" bgHex="#FFF8B9" sample="Husk at gemme" />
                <StatusSwatch name="Error" textHex="#D32F2F" bgHex="#FFDADA" sample="Noget gik galt" />
                <StatusSwatch name="Info" textHex="#4FAED1" bgHex="#E5F6FD" sample="Godt at vide" />
              </div>
              <CodeBlock
                language="css"
                code={`:root {
  --color-success-text: #4CAF50;
  --color-success-bg:   #CEFFD1;

  --color-warning-text: #D38A33;
  --color-warning-bg:   #FFF8B9;

  --color-error-text:   #D32F2F;
  --color-error-bg:     #FFDADA;

  --color-info-text:    #4FAED1;
  --color-info-bg:      #E5F6FD;
}`}
              />
            </div>

            <div className="pt-2 space-y-3">
              <h3 className="text-xl text-primary">Exit-knapper</h3>
              <p>
                Error-farven <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-primary/10">#D32F2F</code> bruges også som <strong>border</strong> på exit-knapper (f.eks. "Afslut flow" i opgaveoversigten). Det signalerer tydeligt, at handlingen afbryder brugerens flow, uden at knappen i sig selv fremstår alarmerende.
              </p>
              <CodeBlock
                language="css"
                code={`.btn-exit {
  background: var(--bg-white);
  color: var(--color-error-text);
  border: 2px solid #D32F2F;        /* exit-border */
  padding: 0.625rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.btn-exit:hover  { background: var(--color-error-bg); }
.btn-exit:focus-visible {
  outline: 3px solid #D32F2F;
  outline-offset: 2px;
}`}
              />
            </div>






            <DoDontList
              dos={[
                "Brug den mørkeblå (#233d68) som baggrund sammen med hvid tekst.",
                "Brug udelukkende den mørkegrå (#333333) som tekstfarve til brødtekst, og placer den altid på de helt lyse baggrunde (#DCEFF6, #F0F8FF, #F7F7F7 eller #FFFFFF).",
                "Brug den lyseblå (#4FAED1) som et fritstående grafisk element (f.eks. til knapper eller overlays).",
              ]}
              donts={[
                "Brug aldrig den mørkegrå (#333333) som baggrundsfarve.",
                "Brug ikke den lyseblå (#4FAED1) som tekstfarve, især ikke ovenpå den mørkeblå baggrund.",
                "Undgå lyse farver som tekst ovenpå de lysegrå og lyseblå baggrunde, da kontrasten bliver for lav.",
                "Undgå altid rød skrift på sort baggrund samt kombinationer af grøn og rød skrift over hinanden — det flimrer og er uhensigtsmæssigt for farveblinde.",
              ]}
            />
          </SectionShell>

          {/* 3. Afstande og Komposition */}
          <SectionShell id="afstande-og-komposition" number={3} title="Afstande og Komposition">
            <p>
              For at sikre forståelse skal elementer, som har en betydning for hinanden, være tætte (gestalt).
              Det er vigtigt, at elementerne har en fast afstand til omkringliggende elementer — det sikrer, at det
              ønskede indhold forbliver tydeligt.
            </p>

            <div className="space-y-6">
              <h3 className="text-xl text-primary pt-2">Oplæringsbibliotek</h3>
              <ImageBox src={komposition1Img} label="afstande og komposition 1" zoomable />
              <h3 className="text-xl text-primary pt-2">Opgaveoversigt</h3>
              <ImageBox src={komposition2Img} label="afstande og komposition 2" zoomable />
              <h3 className="text-xl text-primary pt-2">Hotspot</h3>
              <ImageBox src={komposition3Img} label="afstande og komposition 3" zoomable />
            </div>

            <DoDontList
              dos={[
                "Brug bevidst negativt rum (white space) til at adskille funktioner, så de utrygge brugere let kan afkode interfacet.",
              ]}
              donts={[
                "Pres ikke for mange tekster og knapper tæt sammen (\"information overload\") — det overvælder brugeren og skaber friktion.",
              ]}
            />
          </SectionShell>

          {/* 4. Tone of Voice */}
          <SectionShell id="tone-of-voice" number={4} title="Tone of Voice & UX Writing">
            <p>
              For at sikre at vi altid lyder som os, er det vigtigt at følge BWC'en. Dette er en stor del af at få
              brugerne godt og let igennem de forskellige flows, uden de sidder fast.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-left">
                    <th className="p-3 border border-primary/15 font-semibold text-primary">Karakteristika</th>
                    <th className="p-3 border border-primary/15 font-semibold text-primary">Beskrivelse</th>
                    <th className="p-3 border border-primary/15 font-semibold text-primary">Gør dette</th>
                    <th className="p-3 border border-primary/15 font-semibold text-primary">Gør ikke dette</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr>
                    <td className="p-3 border border-primary/15 font-medium">Betryggende</td>
                    <td className="p-3 border border-primary/15">
                      Vi skaber tillid og fjerner frygten for at begå fejl gennem rolig og støttende dialog.
                    </td>
                    <td className="p-3 border border-primary/15">
                      Brug positive ord som "trygt", "nemt" og "vi guider dig". Skriv direkte og personligt til "dig".
                    </td>
                    <td className="p-3 border border-primary/15">
                      Undgå skræmmende fejlbeskeder som "FATAL FEJL" eller et koldt, klinisk sprog.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-primary/15 font-medium">Pædagogisk</td>
                    <td className="p-3 border border-primary/15">
                      Vi tager brugeren i hånden og forklarer tingene enkelt, så alle kan være med uanset it-evner.
                    </td>
                    <td className="p-3 border border-primary/15">
                      Hold sætningerne korte og præcise. Fortæl klart, hvad det næste skridt er ("Keep it simple").
                    </td>
                    <td className="p-3 border border-primary/15">
                      Undgå teknisk jargon, brancheslang og fremmedord. Vær aldrig nedladende eller for kompleks.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-primary/15 font-medium">Imødekommende</td>
                    <td className="p-3 border border-primary/15">
                      Vi taler i øjenhøjde og viser det menneskelige nærvær bag softwaren.
                    </td>
                    <td className="p-3 border border-primary/15">
                      Vær ærlig, konkret og vis forståelse for kundens hverdag og udfordringer.
                    </td>
                    <td className="p-3 border border-primary/15">
                      Undgå den tørre, passive "corporate" stil. Lad være med at skrive upersonligt som f.eks. "brugeren".
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ImageBox src={toneOfVoiceImg} label="tone of voice" />
          </SectionShell>

          {/* 5. Typografi */}
          <SectionShell id="typografi" number={5} title="Typografi">
            <p>
              Den gennemgående skrifttype til hele løsningen er Roboto, som er Ameros officielle font i deres online designguide.
            </p>
            <p>
              For at imødekomme kravene til webtilgængelighed og læsbarhed er typografien opsat med fokus på hierarki
              og skalérbarhed. Brødteksten (p) har som udgangspunkt en basisstørrelse på 16px (svarende til 1rem i
              koden) og en linjeafstand (skydning) på 1.5, hvilket gør teksten nem at læse og følge for de utrygge
              brugere.
            </p>

            <div className="pt-2 space-y-3">
              <h3 className="text-xl text-primary">Tilladte font-weights</h3>
              <p>
                Kun tre vægte af Roboto må anvendes i løsningen. Hold dig til disse for at sikre et konsistent typografisk hierarki.
              </p>
              <ul className="rounded-sm border border-primary/15 bg-white/40 divide-y divide-primary/10">
                <li className="flex items-baseline justify-between px-5 py-3">
                  <span style={{ fontFamily: '"Roboto", system-ui, sans-serif', fontWeight: 400 }} className="text-lg">
                    Roboto Regular
                  </span>
                  <span className="font-mono text-sm opacity-70">font-weight: 400;</span>
                </li>
                <li className="flex items-baseline justify-between px-5 py-3">
                  <span style={{ fontFamily: '"Roboto", system-ui, sans-serif', fontWeight: 500 }} className="text-lg">
                    Roboto Medium
                  </span>
                  <span className="font-mono text-sm opacity-70">font-weight: 500;</span>
                </li>
                <li className="flex items-baseline justify-between px-5 py-3">
                  <span style={{ fontFamily: '"Roboto", system-ui, sans-serif', fontWeight: 700 }} className="text-lg">
                    Roboto Bold
                  </span>
                  <span className="font-mono text-sm opacity-70">font-weight: 700;</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 space-y-3">
              <h3 className="text-xl text-primary">Brødtekst — CSS-regler</h3>
              <p>
                Brødtekst skal altid kodes med relative enheder (<code className="font-mono text-sm px-1.5 py-0.5 rounded bg-primary/10">rem</code>). Faste pixelværdier er forbudt af hensyn til WCAG 2.1, så brugeren kan zoome op til 200 % uden at designet knækker.
              </p>
              <CodeBlock
                language="css"
                code={`p {
  font-family: "Roboto", system-ui, sans-serif;
  font-size: 1rem;     /* 16px basis — skalerbar */
  line-height: 1.5;    /* skydning for læsbarhed */
  font-weight: 400;
}`}
              />
            </div>

            <ImageBox src={typografiImg} label="typografi-hierarki" />


            <DoDontList
              dos={[
                "Brug relative måleenheder som rem til skriftstørrelser i stedet for faste pixelværdier. Dette er et direkte WCAG-krav, som sikrer, at brugere med nedsat syn kan zoome op til 200 % uden at designet knækker.",
              ]}
              donts={[
                "Undgå for lange tekster uden \"luft\". Afstanden mellem to afsnit bør være 1.5 til 2 gange linjeafstanden for at skabe en tydelig og rolig struktur.",
              ]}
            />
          </SectionShell>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
