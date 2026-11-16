import { DM_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { CONTENT } from "@/content";
import type { Locale } from "@/content/types";
import { FIRST_VISIT_REDIRECT_SCRIPT } from "@/lib/locale-storage";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

/**
 * Marca a página para as animações de entrada só quando o JavaScript roda e o
 * visitante não pediu movimento reduzido. Sem isso, todo o conteúdo fica visível.
 */
const MOTION_FLAG_SCRIPT = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js-motion")}catch(e){}`;

export default function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={CONTENT[locale].htmlLang}
      className={`${manrope.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {locale === "pt" && (
          <script dangerouslySetInnerHTML={{ __html: FIRST_VISIT_REDIRECT_SCRIPT }} />
        )}
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
