import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "SR Chess Academy — Shivika Rohilla | FIDE-Rated Chess Training",
  description:
    "Train under Shivika Rohilla — FIDE-rated champion and India's foremost chess coach. From first move to tournament podium, every lesson is engineered for strategic mastery.",
  keywords: [
    "chess academy",
    "chess training",
    "FIDE rated",
    "Shivika Rohilla",
    "chess coach India",
    "learn chess online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
