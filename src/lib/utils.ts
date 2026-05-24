// Hjælpefunktioner brugt på tværs af appen.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn = "className" — kombinerer flere Tailwind class-strenge til én.
 *
 * - `clsx` håndterer betinget logik (objekter, arrays, falsy værdier).
 * - `twMerge` fjerner duplikerede/konfliktende Tailwind-klasser, så
 *   fx `cn("p-2", "p-4")` resulterer i kun `p-4`.
 *
 * Bruges i hele appen til at flette base-klasser med variant-klasser.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
