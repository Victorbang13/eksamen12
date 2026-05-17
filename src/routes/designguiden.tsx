import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

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

function ImageBox({ label = "Tilføj billede", ratio = "aspect-[16/9]" }: { label?: string; ratio?: string }) {
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

function DoDontList({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <div className="rounded-sm border border-primary/15 p-5 bg-white/40">
        <h4 className="font-semibold text-primary">Do</h4>
        <ul className="mt-3 space-y-2 list-disc pl-5 text-sm leading-relaxed">
          {dos.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-sm border border-primary/15 p-5 bg-white/40">
        <h4 className="font-semibold text-primary">Don't</h4>
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

        <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
          {/* 1. Brug af elementer */}
          <SectionShell id="brug-af-elementer" number={1} title="Brug af elementer (Atomic Design)">
            <p>
              Generelt set består onboarding-flowet af tre komponenter: hotspot, tekstbokse og opgaveoversigten.
              Elementerne er opbygget ved brug af Atomic Design, hvilket sikrer, at nye flows laves med elementer,
              som består af de samme atomer, molekyler og organismer. Ved at bruge denne opbygning sikrer vi, at det
              kun er teksten til de forskellige flows, der differentierer sig. Det gør det nemt for Amero at genbruge
              de faste tilstande (normal, hover, active) for f.eks. primære og sekundære knapper.
            </p>

            <ImageBox label="Tilføj billede — Atomic Design oversigt" />

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
              <ImageBox label="Tilføj billede — Hotspot" />
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="text-xl text-primary">Opgaveoversigten</h3>
              <p>
                Oversigten over opgaver er der for at visualisere, hvor langt brugeren er i flowet. Derudover indeholder
                den også en hurtig udvej fra flowet, hvilket er vigtigt for, at brugeren kan føle sig tryg.
              </p>
              <ImageBox label="Tilføj billede — Opgaveoversigten" />
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="text-xl text-primary">Flow-bibliotek</h3>
              <p>
                I dette element er der mulighed for at tilføje flere flows. Det åbner muligheden for at oplære i flows,
                som i fremtiden viser sig at kræve oplæring. Elementet er placeret ved login-skærmen, da det ikke bør
                være nødvendigt at være logget ind — flowsne foregår i et sandbox-miljø.
              </p>
              <ImageBox label="Tilføj billede — Flow-bibliotek" />
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
              <ColorSwatch name="Mørkeblå" hex="#233d68" textOn="dark" />
              <ColorSwatch name="Lyseblå (accent)" hex="#4FAED1" />
              <ColorSwatch name="Sart lyseblå" hex="#DCEFF6" />
              <ColorSwatch name="Helt sart lyseblå" hex="#F0F8FF" />
              <ColorSwatch name="Lysegrå" hex="#F7F7F7" />
              <ColorSwatch name="Hvid" hex="#FFFFFF" />
              <ColorSwatch name="Mørkegrå / brødtekst" hex="#333333" textOn="dark" />
            </div>

            <ImageBox label="Tilføj billede — eksempel på farveanvendelse" />

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

            <ImageBox label="Tilføj billede — afstande og komposition" />

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
                    <th className="p-3 border border-primary/15 font-semibold text-primary">Do</th>
                    <th className="p-3 border border-primary/15 font-semibold text-primary">Don't</th>
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

            <ImageBox label="Tilføj billede — tone of voice eksempel" />
          </SectionShell>

          {/* 5. Typografi */}
          <SectionShell id="typografi" number={5} title="Typografi">
            <p>
              For at imødekomme kravene til webtilgængelighed og læsbarhed er typografien opsat med fokus på hierarki
              og skalérbarhed. Brødteksten (p) har som udgangspunkt en basisstørrelse på 16px (svarende til 1rem i
              koden) og en linjeafstand (skydning) på 1.5, hvilket gør teksten nem at læse og følge for de utrygge
              brugere.
            </p>

            <ImageBox label="Tilføj billede — typografi-hierarki" />

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
      </main>
      <SiteFooter />
    </>
  );
}
