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

  return (
    <footer className="bg-[#1c1f24] w-full pt-20 md:pt-24 pb-10 overflow-hidden" id="contact">
      <div className="max-w-[1400px] mx-auto px-6">

        {!hideCta && (
          <div className="grid lg:grid-cols-12 gap-8 items-end pb-16 mb-16 border-b border-white/10">
            <h2 className="lg:col-span-8 text-3xl md:text-5xl text-white font-light tracking-[-0.03em] leading-[1.08] text-balance">
              {t('contactUs')}
            </h2>
            <div className="lg:col-span-4 lg:justify-self-end flex flex-wrap gap-3">
              <button
                onClick={onDemoClick}
                className="bg-accent text-on-accent font-mono uppercase tracking-[0.14em] text-[13px] px-6 py-4 rounded-[6px] hover:bg-accent/90 transition-colors whitespace-nowrap cursor-pointer focus-ring"
              >
                {t('getQuote')}
              </button>
              <a
                href="tel:+97142573677"
                dir="ltr"
                className="border border-white/30 text-white font-mono tracking-[0.12em] text-[13px] px-6 py-4 rounded-[6px] hover:border-white transition-colors whitespace-nowrap focus-ring"
              >
                +971 4 257 3677
              </a>
            </div>
          </div>
        )}

        {/* Bottom Section (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 font-mono text-xs uppercase tracking-widest text-white/70 leading-relaxed">

          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">{t('getInTouch')}</span>
            <a href="tel:+97142573677" className="hover:text-accent transition-colors focus-ring w-fit">
              {t('companyName')}<br />
              {t('dubaiUae')}<br />
              {t('riyadhSaudi')}<br />
              +971 4 257 3677
            </a>
            <a href="mailto:info@islandtoweruae.ae" className="hover:text-accent transition-colors focus-ring w-fit">
              INFO@ISLANDTOWERUAE.AE
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">{t('company')}</span>
            <Link href="/" className="hover:text-accent transition-colors focus-ring">{t('home')}</Link>
            <Link href="/about" className="hover:text-accent transition-colors focus-ring">{t('aboutUs')}</Link>
            <Link href="/services" className="hover:text-accent transition-colors focus-ring">{t('services')}</Link>
            <Link href="/projects" className="hover:text-accent transition-colors focus-ring">{t('projects')}</Link>
            <Link href="/news" className="hover:text-accent transition-colors focus-ring">{t('insights')}</Link>
            <Link href="/careers" className="hover:text-accent transition-colors focus-ring">{t('careers')}</Link>
            <Link href="/contact" className="hover:text-accent transition-colors focus-ring">{t('contactUsLink')}</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">{t('servicesHeading')}</span>
            <Link href="/services#district-cooling" className="hover:text-accent transition-colors focus-ring">{t('serviceNetworks')}</Link>
            <Link href="/services#district-cooling" className="hover:text-accent transition-colors focus-ring">{t('serviceFlushing')}</Link>
            <Link href="/services#district-cooling" className="hover:text-accent transition-colors focus-ring">{t('serviceEts')}</Link>
            <Link href="/services#mep" className="hover:text-accent transition-colors focus-ring">{t('serviceMep')}</Link>
            <Link href="/about#quality" className="hover:text-accent transition-colors focus-ring">{t('quality')}</Link>
            <a href="/island-tower-company-profile.pdf" download className="hover:text-accent transition-colors focus-ring">{t('companyProfile')}</a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">{t('followUs')}</span>
            <a
              href="https://www.linkedin.com/company/island-tower-electromech/posts/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-accent transition-colors w-fit mt-1 focus-ring"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="mt-20 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>{t('copyright', { year: new Date().getFullYear() })}</span>
          <span>{t('locations')}</span>
        </div>
      </div>
    </footer>
  );
}
