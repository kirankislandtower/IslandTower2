import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { routing } from "@/i18n/routing";
import "../globals.css";

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
const siteDescriptionAr =
  "شركة جزيرة البرج للأعمال الكهروميكانيكية ذ.م.م رائدة في تقديم حلول البنية التحتية والأعمال الكهروميكانيكية والهندسة المدنية في دبي والإمارات العربية المتحدة والمملكة العربية السعودية.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const description = isAr ? siteDescriptionAr : siteDescription;
  const title = isAr
    ? "جزيرة البرج | الأعمال الكهروميكانيكية والهندسة المدنية"
    : "Island Tower | Electro-Mechanical & Civil Engineering";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${isAr ? "جزيرة البرج" : "Island Tower"}`,
    },
    description,
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
      canonical: isAr ? "/ar" : "/",
      languages: {
        en: "/",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_AE" : "en_US",
      url: isAr ? `${siteUrl}/ar` : siteUrl,
      siteName,
      title,
      description,
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
      title,
      description,
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
}

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
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
      <body className="bg-background text-foreground font-sans">
        <NextIntlClientProvider>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
