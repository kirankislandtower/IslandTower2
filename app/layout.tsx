import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = "https://www.islandtoweruae.ae";
const siteName = "Island Tower Electro Mechanical Works LLC";
const siteDescription =
  "Island Tower Electro Mechanical Works LLC is a leading provider of infrastructure, MEP, and civil engineering solutions in Dubai, UAE and Saudi Arabia. 15+ years delivering EPC projects across the region.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Island Tower | Electro-Mechanical & Civil Engineering",
    template: "%s | Island Tower",
  },
  description: siteDescription,
  keywords: [
    "Island Tower",
    "electro mechanical works Dubai",
    "MEP contractor UAE",
    "civil engineering Dubai",
    "infrastructure contractor UAE",
    "EPC contractor Saudi Arabia",
    "water treatment contractor UAE",
    "MEP engineering Riyadh",
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  icons: {
    icon: "https://www.islandtoweruae.ae/images/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Island Tower | Electro-Mechanical & Civil Engineering",
    description: siteDescription,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Island Tower Electro Mechanical Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Island Tower | Electro-Mechanical & Civil Engineering",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: siteName,
  alternateName: "Island Tower",
  url: siteUrl,
  logo: "https://cdn.jsdelivr.net/gh/kirank860/island-tower-assets@main/main-logo.jpeg",
  image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
  description: siteDescription,
  telephone: "+971-4-257-3677",
  email: "info@islandtoweruae.ae",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
  ],
  areaServed: ["United Arab Emirates", "Saudi Arabia"],
  sameAs: [
    "https://www.linkedin.com/company/island-tower-electromechanical-works/",
  ],
  makesOffer: [
    "MEP Engineering",
    "Infrastructure",
    "Civil Works",
    "Energy & Water",
    "Chemical Facilities",
    "Water Treatment",
    "Research & Development",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
