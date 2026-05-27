// Synlig Website Carbon badge baseret på det officielle badge-markup.
// Vi renderer en lokal fallback med det samme, fordi det officielle script
// kan fejle hvis Website Carbon API'et ikke har et resultat for preview-URL'en.
import { useEffect, useState } from "react";

type CarbonResult = {
  c: string;
  p: string | number;
  t?: number;
};

export function CarbonBadge() {
  const [result, setResult] = useState<CarbonResult | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const encodedUrl = encodeURIComponent(window.location.href.split("?")[0]);
    const cacheKey = `wcb_${encodedUrl}`;
    const cached = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cached) {
      try {
        const parsed = JSON.parse(cached) as CarbonResult;
        setResult(parsed);
        if (parsed.t && now - parsed.t < 86_400_000) return;
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    fetch(`https://api.websitecarbon.com/b?url=${encodedUrl}`)
      .then((response) => {
        if (!response.ok) throw new Error("Website Carbon result unavailable");
        return response.json() as Promise<CarbonResult>;
      })
      .then((data) => {
        const next = { ...data, t: Date.now() };
        setResult(next);
        localStorage.setItem(cacheKey, JSON.stringify(next));
      })
      .catch(() => setFailed(true));
  }, []);

  const resultText = result ? (
    <>
      {result.c}g of CO<sub className="relative top-[0.25em] text-[0.7em]">2</sub>/view
    </>
  ) : failed ? (
    "Resultat afventer"
  ) : (
    <>
      Måler CO<sub className="relative top-[0.25em] text-[0.7em]">2</sub>…
    </>
  );

  return (
    <div id="wcb" className="carbonbadge wcb-d text-center text-[15px] leading-tight" aria-label="Website Carbon badge">
      <div className="flex flex-wrap justify-start sm:justify-center">
        <span className="inline-flex min-w-[8.2em] items-center justify-center rounded-l-[0.3em] border-[0.13em] border-[#00ffbc] bg-background px-[0.5em] py-[0.3em] text-[#0e11a8]">
          {resultText}
        </span>
        <a
          className="inline-flex items-center justify-center rounded-r-[0.3em] border-[0.13em] border-[#00ffbc] bg-[#00ffbc] px-[0.5em] py-[0.3em] font-bold text-[#0e11a8] no-underline"
          href="https://websitecarbon.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website Carbon
        </a>
      </div>
      {result && <span className="mt-[0.2em] block text-primary-foreground">Cleaner than {result.p}% of pages tested</span>}
    </div>
  );
}
