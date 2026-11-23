'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface FooterProps {
  onDemoClick: () => void;
  // Pages that already end in their own form (Contact, Careers) hide the
  // "Contact Us / Get a Quote" band so the page asks once, not twice.
  hideCta?: boolean;
}

export default function Footer({ onDemoClick, hideCta = false }: FooterProps) {
  const t = useTranslations('Footer');

  const LINK = 'w-fit text-white/70 hover:text-white transition-colors focus-ring';
  const HEAD = 'text-white text-[15px] md:text-base font-semibold';

  return (
    <footer
      data-section="contact"
      id="contact"
      className="relative z-10 w-full overflow-hidden rounded-t-[48px] md:rounded-t-[110px] bg-[#1c1f24] bg-[radial-gradient(120%_90%_at_85%_10%,#2e333b_0%,#1c1f24_55%,#15171b_100%)] pt-20 md:pt-28 pb-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {!hideCta && (
          <div className="pb-16 md:pb-20">
            <h2 className="text-[36px] md:text-[64px] lg:text-[76px] text-white font-light tracking-[-0.01em] leading-[1.05] text-balance max-w-[20ch]">
              {t('contactUs')}
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={onDemoClick}
                className="group inline-flex items-center gap-3 h-12 px-6 rounded-full bg-accent text-on-accent text-[15px] font-medium hover:bg-white hover:text-[#1c1f24] active:scale-[0.98] transition-[background-color,color,transform] duration-200 cursor-pointer focus-ring"
              >
                {t('getQuote')}
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden="true">↗</span>
              </button>
              <a
                href="tel:+97142573677"
                dir="ltr"
                className="inline-flex items-center h-12 px-6 rounded-full bg-white/10 text-white text-[15px] font-medium hover:bg-white/20 transition-colors focus-ring"
              >
                +971 4 257 3677
              </a>
            </div>
          </div>
        )}

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 text-[15px] md:text-base leading-snug">
          <div className="flex flex-col gap-3">
            <span className={HEAD}>{t('getInTouch')}</span>
            <span className="text-white/70">{t('companyName')}</span>
            <span className="text-white/70">{t('dubaiUae')}</span>
            <a href="tel:+97142573677" dir="ltr" className={LINK}>+971 4 257 3677</a>
            <a href="mailto:info@islandtoweruae.ae" className={LINK}>info@islandtoweruae.ae</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className={HEAD}>{t('company')}</span>
            <Link href="/" className={LINK}>{t('home')}</Link>
            <Link href="/about" className={LINK}>{t('aboutUs')}</Link>
            <Link href="/projects" className={LINK}>{t('projects')}</Link>
            <Link href="/news" className={LINK}>{t('insights')}</Link>
            <Link href="/careers" className={LINK}>{t('careers')}</Link>
            <Link href="/contact" className={LINK}>{t('contactUsLink')}</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className={HEAD}>{t('servicesHeading')}</span>
            <Link href="/services#district-cooling" className={LINK}>{t('serviceNetworks')}</Link>
            <Link href="/services#district-cooling" className={LINK}>{t('serviceFlushing')}</Link>
            <Link href="/services#district-cooling" className={LINK}>{t('serviceEts')}</Link>
            <Link href="/services#mep" className={LINK}>{t('serviceMep')}</Link>
            <Link href="/about#quality" className={LINK}>{t('quality')}</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className={HEAD}>{t('followUs')}</span>
            <a
              href="https://www.linkedin.com/company/island-tower-electromech/posts/"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-20 md:mt-24 flex flex-col sm:flex-row sm:items-center gap-x-10 gap-y-3 text-[14px] text-white/50">
          <span>{t('copyright', { year: new Date().getFullYear() })}</span>
          <span>{t('locations')}</span>
        </div>
      </div>

    </footer>
  );
}
