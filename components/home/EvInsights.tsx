'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { articles, localizeArticle, type Locale } from '@/lib/news';
import { GUTTER, Label, Pill, Rise, SERIF } from './ui';

// Insights: the newest article under a tall arched photograph on the start
// side; the next three as ruled rows on the end side, each with its day set
// large, the title and one line, and a round photograph that grows a little
// (with an arrow sliding in) when the row is pointed at.
export default function EvInsights() {
  const t = useTranslations('Home2.insights');
  const locale = useLocale() as Locale;
  const list = articles.slice(0, 4).map((a) => localizeArticle(a, locale));
  const loc = locale === 'ar' ? 'ar-AE' : 'en-GB';
  const full = (d: string) => new Date(d).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' });
  const day = (d: string) => new Date(d).toLocaleDateString(loc, { day: '2-digit' });
  const monthYear = (d: string) => new Date(d).toLocaleDateString(loc, { month: 'short', year: 'numeric' });
  const [lead, ...rest] = list;

  return (
    <section data-section="insights" className={`bg-[#f4f3ea] text-[#1a1a17] ${GUTTER} pb-28 md:pb-48`}>
      <div className="border-t border-[#1a1a17]/12 pt-5 flex items-center justify-between gap-6">
        <Rise><Label>{t('label')}</Label></Rise>
        <Rise><Pill href="/news">{t('all')}</Pill></Rise>
      </div>

      <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-x-10 xl:gap-x-16 gap-y-14">
        {/* The newest, under an arch */}
        <Rise className="lg:col-span-5">
          <Link href={`/news/${lead.slug}`} className="group block focus-ring rounded-[16px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[16px] bg-[#e7e5da]">
              <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
            </div>
            <span className="mt-6 inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.08em] uppercase text-[#3f403c]">
              <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
              {full(lead.date)}
            </span>
            <h3 className={`${SERIF} mt-3 text-[30px] md:text-[clamp(32px,2.6vw,42px)] leading-[1.05] max-w-[20ch] transition-colors group-hover:text-accent`}>{lead.title}</h3>
            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.6] font-medium text-[#1a1a17]/70 max-w-[48ch]">{lead.excerpt}</p>
          </Link>
        </Rise>

        {/* The next three, as ruled rows */}
        <ol className="lg:col-span-7 lg:self-center border-b border-[#1a1a17]/15">
          {rest.map((a, i) => (
            <li key={a.slug} className="border-t border-[#1a1a17]/15">
              <Rise delay={0.06 + i * 0.06}>
                <Link href={`/news/${a.slug}`} className="group grid grid-cols-[auto_1fr] sm:grid-cols-[5.5rem_1fr_auto] items-center gap-x-5 md:gap-x-8 gap-y-4 py-7 md:py-9 focus-ring">
                  <span className="row-span-2 sm:row-span-1 self-start sm:self-center flex flex-col">
                    <span className={`${SERIF} text-[44px] md:text-[56px] leading-[0.9] tabular-nums transition-colors group-hover:text-accent`}>{day(a.date)}</span>
                    <span className="mt-2 text-[11px] font-medium tracking-[0.08em] uppercase text-[#1a1a17]/55">{monthYear(a.date)}</span>
                  </span>
                  <span className="block">
                    <span className={`${SERIF} block text-[22px] md:text-[clamp(22px,1.8vw,28px)] leading-[1.12] transition-colors group-hover:text-accent`}>{a.title}</span>
                    <span className="mt-2 block text-[14px] md:text-[15px] leading-[1.55] font-medium text-[#1a1a17]/65 max-w-[52ch]">{a.excerpt}</span>
                  </span>
                  {/* Round photograph, growing a little with an arrow sliding in */}
                  <span className="relative col-start-2 sm:col-start-auto w-[84px] h-[84px] md:w-[112px] md:h-[112px] shrink-0 rounded-full overflow-hidden bg-[#e7e5da] transition-transform duration-500 ease-out group-hover:scale-[1.08]">
                    <Image src={a.image} alt="" fill sizes="112px" className="object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-accent/85 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-2 rtl:translate-x-2 rtl:-scale-x-100 transition-transform duration-500 group-hover:translate-x-0">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
