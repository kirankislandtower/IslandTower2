'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowCircle, GUTTER, Label, Rise } from '@/components/home/ui';
import { BlurWords, PageShell } from '@/components/page/kit';
import { articles, localizeArticle, type Locale } from '@/lib/news';

// Insights, as the reference's blog: the title over a softened photograph,
// the newest piece large with the next three beside it, then every article
// two-up.
function formatDate(d: string, locale: Locale) {
  return new Date(d).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsContent() {
  const t = useTranslations('NewsPage');
  const p = useTranslations('Pages');
  const locale = useLocale() as Locale;
  const list = articles.map((a) => localizeArticle(a, locale));
  const [first, ...rest] = list;
  const side = rest.slice(0, 3);

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        {/* The lead photograph, softened, fading into the cream halfway down the cards */}
        <div
          className="absolute inset-x-0 top-0 h-[78%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
          aria-hidden="true"
        >
          <Image src={first.image} alt="" fill priority sizes="100vw" className="object-cover scale-125 blur-[24px]" />
          <div className="absolute inset-0 bg-[#1a1a17]/25" />
        </div>
        <div className={`relative ${GUTTER} pt-[132px] md:pt-[150px] pb-20 md:pb-24`}>
          <div className="flex flex-col items-center text-center text-[#f4f3ea]">
            <Label light>{t('eyebrow')}</Label>
            <h1 className="mt-6 font-serif font-normal text-[40px] leading-[44px] sm:text-[52px] sm:leading-[56px] md:text-[60px] md:leading-[64px] tracking-[-1.5px] md:tracking-[-2.5px] max-w-[800px] text-balance">
              <BlurWords text={t('title')} />
            </h1>
          </div>

          <div className="mt-12 md:mt-16 grid lg:grid-cols-[1.45fr_1fr] gap-3 md:gap-4 text-[#1a1a17]">
            <Link href={`/news/${first.slug}`} className="group relative min-h-[460px] md:min-h-[532px] rounded-[10px] overflow-hidden focus-ring">
              <Image src={first.image} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-y-4 start-4 w-[calc(100%-2rem)] sm:w-[300px] rounded-[8px] bg-[#f4f3ea]/85 backdrop-blur-md p-5 md:p-6 flex flex-col">
                <Label>{formatDate(first.date, locale)}</Label>
                <h2 className="mt-5 text-[24px] leading-[28px] md:text-[28px] md:leading-[32px] font-medium tracking-[-0.02em]">{first.title}</h2>
                <p className="mt-4 text-[15px] leading-[22px] md:text-[16px] md:leading-[24px] font-medium text-[#1a1a17]/75">{first.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px]">
                  {p('readArticle')}<ArrowCircle className="w-6 h-6 bg-accent text-white transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </span>
              </div>
            </Link>
            <div className="grid gap-3 md:gap-4">
              {side.map((a) => (
                <Link key={a.slug} href={`/news/${a.slug}`} className="group rounded-[8px] bg-[#e9e9e1] p-5 md:p-6 flex flex-col focus-ring">
                  <Label>{formatDate(a.date, locale)}</Label>
                  <h3 className="mt-4 text-[18px] leading-[24px] md:text-[20px] md:leading-[26px] font-medium tracking-[-0.01em] group-hover:text-accent transition-colors max-w-[30ch]">{a.title}</h3>
                  <span className="mt-auto pt-4 w-fit text-[11px] font-medium underline underline-offset-4 decoration-[#1a1a17]/40">{p('readArticle')}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${GUTTER} pb-24 md:pb-32`}>
        <div className="border-t border-[#1a1a17]/12 pt-5" />
        <Rise><Label>{p('allInsights')}</Label></Rise>
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-x-3 gap-y-14">
          {list.map((a, i) => (
            <Rise key={a.slug} delay={(i % 2) * 0.06}>
              <Link href={`/news/${a.slug}`} className="group block focus-ring rounded-[10px]">
                <div className="relative aspect-[3/2] rounded-[10px] overflow-hidden">
                  <Image src={a.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-5"><Label>{formatDate(a.date, locale)} · {a.category}</Label></div>
                <h3 className="mt-3 text-[20px] md:text-[22px] leading-[1.25] font-medium tracking-[-0.01em] group-hover:text-accent transition-colors">{a.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] font-medium text-[#1a1a17]/70 max-w-[56ch]">{a.excerpt}</p>
              </Link>
            </Rise>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
