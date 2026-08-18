import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Island Tower | Electro-Mechanical & Civil Engineering",
  description: "Island Tower Electro Mechanical Works LLC is a leading provider of Infrastructure, MEP, and Civil Engineering solutions in Dubai and Saudi Arabia.",
  icons: {
    icon: 'https://www.islandtoweruae.ae/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
