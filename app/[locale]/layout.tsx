import type { Metadata } from "next";
import { Onest, Saira_Semi_Condensed } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import { routing } from "@/i18n/routing";
import "lenis/dist/lenis.css";
import "../globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Small spaced-capital labels (nav, eyebrows, buttons).
const sairaLabel = Saira_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const onestHeading = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = "https://www.islandtoweruae.ae";
const siteName = "Island Tower Electro Mechanical Works LLC";
const FOUNDED_YEAR = 2003;
const yearsInOperation = new Date().getFullYear() - FOUNDED_YEAR;
const siteDescription = `District cooling and chilled water network specialist in the UAE since ${FOUNDED_YEAR}, with MEP building services and RTA-approved infrastructure works. ISO 9001, 14001 and 45001 certified.`;
const siteDescriptionAr =
  "متخصصون في التبريد المركزي وشبكات المياه المبردة في الإمارات منذ 2003، مع خدمات كهروميكانيكية متكاملة للمباني. معتمدون من هيئة الطرق والمواصلات وحاصلون على شهادات ISO 9001 و14001 و45001.";

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
    ? "جزيرة البرج | التبريد المركزي والكهروميكانيك والبنية التحتية في دبي"
    : "Island Tower | District Cooling, MEP & Infrastructure, Dubai";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${isAr ? "جزيرة البرج" : "Island Tower"}`,
    },
    description,
    keywords: [
      "Island Tower",
      "Island Tower Electro Mechanical Works",
      "district cooling contractor Dubai",
      "chilled water network contractor UAE",
      "chilled water flushing Dubai",
      "chilled water flushing UAE",
      "hot tapping chilled water Dubai",
      "ETS installation Dubai",
      "electro mechanical works Dubai",
      "MEP contractor UAE",
      "MEP contractor Dubai",
      "RTA approved contractor Dubai",
      "civil engineering Dubai",
      "infrastructure contractor UAE",
      "EPC contractor Saudi Arabia",
      "water treatment contractor UAE",
      "MEP engineering Riyadh",
      "district cooling plants contracting Dubai",
      "water pipelines and stations contracting UAE",
      "steel constructions contracting Dubai",
      "ISO certified contractor UAE",
    ],
    applicationName: siteName,
    authors: [{ name: siteName }],
    icons: {
      icon: "/images/favicon.png",
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
          url: "https://www.islandtoweruae.ae/images/site/large-diameter-pipe-install.jpg",
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
    verification: {
      google: "v0oE5QPx6QRUXWnzxFNK3-RchOl5LFJUoUe8vR03qBk",
    },
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: siteName,
  alternateName: "Island Tower",
  url: siteUrl,
  logo: `${siteUrl}/images/logo/island-tower-logo-full.png`,
  image: `${siteUrl}/images/site/large-diameter-pipe-install.jpg`,
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
    "https://www.linkedin.com/company/island-tower-electromech/posts/",
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
      className={`${onest.variable} ${sairaLabel.variable} ${onestHeading.variable}`}
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
          <SmoothScroll />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
