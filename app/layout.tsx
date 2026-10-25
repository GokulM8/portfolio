import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ML Engineer`, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: `${site.name} · ML Engineer`, description: site.description, url: site.url, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: `${site.name} · ML Engineer`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

// Runs before paint: marks JS as available (so in-view animations may hide content first)
// and applies the saved or system theme, so there's no flash.
const boot = `(()=>{const d=document.documentElement;d.classList.add("js");let t;try{t=localStorage.getItem("theme")}catch(e){}d.dataset.theme=t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
