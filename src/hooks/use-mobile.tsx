import * as React from "react";

// Breakpoint i px hvor vi skifter mellem mobil- og desktop-layout.
// Matcher Tailwinds `md` breakpoint, så hooken og CSS er synkroniseret.
const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook der returnerer `true`, hvis viewport er smallere end
 * MOBILE_BREAKPOINT. Bruges fx i prototypen-siden til at vise en
 * "fuld skærm"-knap kun på mobil.
 *
 * Bemærk: returnerer `false` ved første render (SSR-safe), og opdateres
 * når vinduet matcher media query'en.
 */
export function useIsMobile() {
  // `undefined` indtil vi har målt vinduet (undgår hydrations-mismatch).
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Opretter en MediaQueryList som lytter efter ændringer i viewport-bredde.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    // Kaldes både initielt og hver gang viewport krydser breakpointet.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    // Sæt initialværdi ud fra nuværende vindue (kun klient-side).
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    // Cleanup: fjern listener når komponenten unmountes.
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Tving til boolean, så caller ikke skal håndtere `undefined`.
  return !!isMobile;
}
