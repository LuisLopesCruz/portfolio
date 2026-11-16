import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { CONTENT } from "@/content";
import type { Locale } from "@/content/types";
import { FIRST_VISIT_REDIRECT_SCRIPT } from "@/lib/locale-storage";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export default function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={CONTENT[locale].htmlLang} className={`${plexSans.variable} ${plexMono.variable}`}>
      <head>
        {locale === "pt" && (
          <script dangerouslySetInnerHTML={{ __html: FIRST_VISIT_REDIRECT_SCRIPT }} />
        )}
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
