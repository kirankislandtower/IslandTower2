'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { articles, localizeArticle, type Locale } from '@/lib/news';
import { GUTTER, Label, Pill, Rise } from './ui';

// Insights: the newest article large on the left, the next two side by
// side on the right, each with its date, title and one line.
export default function EvInsights() {
  const t = useTranslations('Home2.insights');
  const locale = useLocale() as Locale;
  const list = articles.slice(0, 3).map((a) => localizeArticle(a, locale));
  const date = (d: string) => new Date(d).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const [big, ...small] = list;

  return (
    <section data-section="insights" className={`bg-[#f4f3ea] text-[#1a1a17] ${GUTTER} pb-24 md:pb-36`}>
      <div className="border-t border-[#1a1a17]/12 pt-5 flex items-center justify-between gap-6">
        <Rise><Label>{t('label')}</Label></Rise>
        <Rise><Pill href="/news">{t('all')}</Pill></Rise>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-x-4 gap-y-12">
        <Rise>
          <Link href={`/news/${big.slug}`} className="group block focus-ring">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[10px] bg-[#e7e5da]">
              <Image src={big.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
            </div>
            <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.08em] uppercase text-[#3f403c]">
              <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
              {date(big.date)}
            </span>
            <h3 className="mt-3 text-[24px] md:text-[28px] leading-[1.2] font-medium group-hover:text-accent transition-colors max-w-[24ch]">{big.title}</h3>
            <p className="mt-3 text-[15px] md:text-[16px] font-medium text-[#1a1a17]/75 max-w-[52ch]">{big.excerpt}</p>
          </Link>
        </Rise>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-12 content-start">
          {small.map((a, i) => (
            <Rise key={a.slug} delay={0.08 + i * 0.08}>
              <Link href={`/news/${a.slug}`} className="group block focus-ring">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[#e7e5da]">
                  <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                </div>
                <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.08em] uppercase text-[#3f403c]">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent" aria-hidden="true" />
                  {date(a.date)}
                </span>
                <h3 className="mt-3 text-[20px] md:text-[22px] leading-[1.25] font-medium group-hover:text-accent transition-colors">{a.title}</h3>
                <p className="mt-2 text-[15px] font-medium text-[#1a1a17]/75">{a.excerpt}</p>
              </Link>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
