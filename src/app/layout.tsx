import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Sufi's Cafe — specialty coffee, matcha bar & all-day brunch",
  description:
    "Sufi's Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00.",
  authors: [{ name: "Sufi's Cafe" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Sufi's Cafe — specialty coffee, matcha bar & all-day brunch",
    description:
      "Sufi's Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00.",
    type: "website",
    url: "https://luna-coffee.lovable.app",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34d2ef6d-06c9-4a31-a95e-4e9851e550e4/id-preview-07e17fe4--b8aa6683-45f6-42d3-a036-8444c4bfccdb.lovable.app-1785439736412.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sufi's Cafe — specialty coffee, matcha bar & all-day brunch",
    description:
      "Sufi's Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34d2ef6d-06c9-4a31-a95e-4e9851e550e4/id-preview-07e17fe4--b8aa6683-45f6-42d3-a036-8444c4bfccdb.lovable.app-1785439736412.png",
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006241",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Sufi's Cafe",
        url: "https://luna-coffee.lovable.app",
        telephone: BRAND.phone,
      },
      {
        "@type": "WebSite",
        name: "Sufi's Cafe",
        url: "https://luna-coffee.lovable.app",
        inLanguage: ["en", "hi"],
      },
    ],
  };

  return (
    <html lang="en" style={{ backgroundColor: "#f7f5f0" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ backgroundColor: "#f7f5f0", color: "#1e3932" }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

