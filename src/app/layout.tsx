import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://walkinanddine.com"),
  title: {
    default: "Walkin & Dine | Contemporary Wood-Fired Dining",
    template: "%s | Walkin & Dine",
  },
  description:
    "An unhurried dining room centered around wood fire, coastal terroir, and seasonal harvests. Reserve your evening at Walkin & Dine.",
  openGraph: {
    title: "Walkin & Dine | Contemporary Wood-Fired Dining",
    description:
      "An unhurried dining room centered around wood fire, coastal terroir, and seasonal harvests.",
    siteName: "Walkin & Dine",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1280,
        height: 720,
        alt: "Walkin & Dine warm candlelit dining room and wood-fired hearth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walkin & Dine | Contemporary Wood-Fired Dining",
    description:
      "An unhurried dining room centered around wood fire, coastal terroir, and seasonal harvests.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0908] text-[#F4EFE6] selection:bg-[#C59B6D] selection:text-[#0A0908]">
        {children}
      </body>
    </html>
  );
}
