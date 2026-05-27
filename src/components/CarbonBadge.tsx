// Client-only Carbon Badge fra websitecarbon.com.
// Scriptet manipulerer DOM'en inde i #wcb efter mount, hvilket vil
// forårsage hydration-mismatch hvis det renders under SSR. Derfor
// monteres badge'en kun i browseren via useEffect.
import { useEffect, useState } from "react";

export function CarbonBadge() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Undgå dobbelt-injection ved client-side navigation.
    if (document.querySelector('script[data-wcb]')) return;
    const s = document.createElement("script");
    s.src = "https://unpkg.com/website-carbon-badges@1.1.3/b.min.js";
    s.async = true;
    s.defer = true;
    s.dataset.wcb = "true";
    document.body.appendChild(s);
  }, []);

  if (!mounted) return null;
  return <div id="wcb" className="carbonbadge wcb-d" />;
}
