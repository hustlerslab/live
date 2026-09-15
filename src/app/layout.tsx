import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ISHANA — Visualize your dream space before you build it",
    template: "%s · ISHANA",
  },
  description:
    "Turn your ideas, inspiration, and room images into beautiful visual concepts and immersive 3D spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-[#FAF7F2] text-[#1C1613] antialiased selection:bg-[#E2D5C3] selection:text-[#5B412D]">
        {children}
      </body>
    </html>
  );
}
