import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
