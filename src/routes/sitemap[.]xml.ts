// Server-route der genererer sitemap.xml dynamisk.
// Filnavnet `sitemap[.]xml.ts` mappes til URL'en `/sitemap.xml` af TanStack
// Router's file-based routing (brackets escaper punktummet).
import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Base-URL bruges til at præfikse alle <loc>-entries med fuld absolut URL,
// hvilket sitemap-protokollen kræver.
const BASE_URL = "https://vbstudio.dk";

/**
 * Én række i sitemap'et. `path` er obligatorisk; resten er optional
 * og hjælper søgemaskiner med at prioritere og crawle effektivt.
 */
interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  // `server.handlers` definerer HTTP-handlers der kører på serveren —
  // her bruges kun GET fordi sitemap udelukkende serveres til crawlere.
  server: {
    handlers: {
      GET: async () => {
        // Liste over alle offentlige sider på sitet.
        // Tilføj nye routes her når der oprettes flere sider.
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/prototypen", changefreq: "monthly", priority: "0.8" },
          { path: "/designguiden", changefreq: "monthly", priority: "0.8" },
        ];

        // Mapper hver entry til en gyldig <url>-blok i XML.
        // `filter(Boolean)` fjerner null-linjer hvis et felt mangler.
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        // Sammensæt den endelige XML-streng med XML-deklaration og urlset-rod.
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        // Returnér som application/xml så crawlere parser det korrekt.
        // Cache i en time for at undgå unødig server-belastning.
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
