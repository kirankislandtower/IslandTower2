'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LocaleSwitcher from '../LocaleSwitcher';
import { ArrowCircle, EASE, Label } from './ui';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';

// The bar, measured from the reference: 16px from the top, 32px from the
// sides, 60px tall, 16px corners, a solid sage-cream fill. Once the page
// moves it tightens to a 600px pill in the centre; the links stay put and
// the logo and the action slide in towards them.
const BAR_BG = 'bg-[#e6e8dd]';
const NARROW = 600;

// Hovering "Pages" opens the bar into a panel, as on the reference: the
// other pages on the left, two landmark projects with their contract
// values on the right, and the page behind softened.
const PAGE_LINKS = ['/services', '/projects', '/careers', '/contact'] as const;
const MEGA_PROJECTS = ['jumeirah-village-south-district-cooling', 'dubai-beachfront-chilled-water-network'];

export default function HomeNav() {
  const t = useTranslations('Home2.nav');
  const [scrolled, setScrolled] = useState(false);
  const [wide, setWide] = useState(1376);
  const [desktop, setDesktop] = useState(true);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const locale = useLocale() as Locale;
  const featured = MEGA_PROJECTS.map((slug) => allProjects.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => localizeProject(x, locale));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onResize = () => {
      setWide(window.innerWidth - 64);
      setDesktop(window.innerWidth >= 768);
    };
    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMega(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mega]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/about', label: t('about') },
  ];
  const pageItems = [
    { href: '/services', label: t('services'), desc: t('servicesDesc') },
    { href: '/projects', label: t('projects'), desc: t('projectsDesc') },
    { href: '/careers', label: t('careers'), desc: t('careersDesc') },
    { href: '/contact', label: t('contactPage'), desc: t('contactDesc') },
  ];
  const narrow = scrolled && desktop && !mega;

  // The page we are on: exact match for Home, the section and anything under it otherwise
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  const pagesActive = PAGE_LINKS.some((h) => isActive(h)) || pathname.startsWith('/industries');

  const barLinks: ({ href: string; label: string } | 'pages')[] = [
    { href: '/', label: t('home') },
    'pages',
    { href: '/about', label: t('about') },
    { href: '/news', label: t('insights') },
  ];
  const linkCls = (on: boolean) =>
    `relative flex items-center gap-1.5 h-[40px] px-3.5 rounded-full transition-colors focus-ring cursor-pointer ${on ? 'text-[#1a1a17] font-medium' : 'text-[#1a1a17]/65 hover:text-[#1a1a17]'}`;
  const dot = <motion.span layoutId="nav-active" className="w-[5px] h-[5px] rounded-full bg-accent" transition={{ duration: 0.4, ease: EASE }} aria-hidden="true" />;

  return (
    <>
      {/* The page behind, softened while the panel is open */}
      <AnimatePresence>
        {mega && desktop && (
          <motion.div
            key="veil"
            className="fixed inset-0 z-40 bg-[#1a1a17]/35 backdrop-blur-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onMouseEnter={() => setMega(false)}
            onClick={() => setMega(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="fixed top-3 md:top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          aria-label={t('menu')}
          initial={false}
          animate={{ width: desktop ? (narrow ? Math.min(NARROW, wide) : wide) : 'calc(100% - 24px)' }}
          transition={{ duration: 0.55, ease: EASE }}
          onMouseLeave={() => setMega(false)}
          className={`pointer-events-auto relative rounded-[14px] md:rounded-[16px] ${BAR_BG} text-[#1a1a17] overflow-hidden`}
        >
         <div className="relative h-[56px] md:h-[60px]">
          {/* Logo, start edge */}
          <Link href="/" className="absolute start-3 md:start-4 top-1/2 -translate-y-1/2 flex items-center focus-ring" aria-label="Island Tower — Home">
            <Image src="/images/logo/island-tower-logo-dark.png" alt="Island Tower" width={267} height={39} priority className="h-[17px] md:h-[19px] w-auto" />
          </Link>

          {/* Links, always centred */}
          <ul className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 text-[14px] leading-none whitespace-nowrap">
            {barLinks.map((l) =>
              l === 'pages' ? (
                <li key="pages">
                  <button
                    type="button"
                    onMouseEnter={() => setMega(true)}
                    onClick={() => setMega((v) => !v)}
                    aria-expanded={mega}
                    aria-haspopup="true"
                    className={`${linkCls(pagesActive)} ${mega ? 'bg-[#f4f3ea]' : ''}`}
                  >
                    {pagesActive && dot}
                    {t('pages')}
                  </button>
                </li>
              ) : (
                <li key={l.href} onMouseEnter={() => setMega(false)}>
                  <Link href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} className={linkCls(isActive(l.href))}>
                    {isActive(l.href) && dot}
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Language and the action, end edge */}
          <div className="absolute end-2 md:end-3 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <AnimatePresence initial={false}>
              {desktop && !narrow && (
                <motion.span
                  key="lang"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[14px]"
                >
                  <LocaleSwitcher isScrolled variant="plain-dark" />
                </motion.span>
              )}
            </AnimatePresence>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center h-[44px] px-5 rounded-full bg-[#1a1a17] text-[#f4f3ea] text-[14px] hover:bg-accent transition-colors focus-ring"
            >
              {t('contact')}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('menu')}
              aria-expanded={open}
              className="md:hidden inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#1a1a17] text-[#f4f3ea] cursor-pointer focus-ring"
            >
              <span className="relative block w-[14px] h-[6px]" aria-hidden="true">
                <span className="absolute inset-x-0 top-0 h-px bg-current" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
              </span>
            </button>
          </div>
         </div>

          {/* The Pages panel */}
          <AnimatePresence initial={false}>
            {mega && desktop && (
              <motion.div
                key="mega"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="px-4 pb-4 pt-6 grid grid-cols-[minmax(240px,0.36fr)_1fr] gap-8 lg:gap-10">
                  <div className="border-t border-[#1a1a17]/15 pt-5">
                    <Label>{t('pagesLabel')}</Label>
                    <ul className="mt-6 flex flex-col gap-4">
                      {pageItems.map((it, i) => (
                        <motion.li key={it.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease: EASE }}>
                          <Link href={it.href} onClick={() => setMega(false)} className="group block focus-ring rounded-[6px]">
                            <span className={`block text-[18px] leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-accent ${isActive(it.href) ? 'text-accent' : ''}`}>{it.label}</span>
                            <span className="mt-1 block text-[14px] leading-[1.45] text-[#1a1a17]/60">{it.desc}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-[#1a1a17]/15 pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <Label>{t('featured')}</Label>
                      <Link href="/projects" onClick={() => setMega(false)} className="text-[11px] font-medium tracking-[0.08em] uppercase underline underline-offset-4 hover:text-accent transition-colors focus-ring">{t('showAll')}</Link>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {featured.map((f, i) => (
                        <motion.div key={f.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}>
                          <Link href={`/projects/${f.slug}`} onClick={() => setMega(false)} className="group relative block aspect-[5/4] max-h-[52vh] w-full overflow-hidden rounded-[10px] bg-[#1a1a17] text-[#f4f3ea] focus-ring">
                            <Image src={f.image} alt="" fill sizes="35vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/35" aria-hidden="true" />
                            {f.client && <span className="absolute top-5 start-5 text-[24px] font-medium tracking-[-0.01em]">{f.client}</span>}
                            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                              <div className="min-w-0 border-s border-accent ps-4">
                                <span className={`block font-serif leading-[1.05] tracking-[-0.02em] ${locale === 'ar' ? 'text-[24px] lg:text-[30px]' : 'text-[26px] lg:text-[34px] xl:text-[40px] whitespace-nowrap'}`}>{f.contractValue}</span>
                                <span className="mt-2 block text-[13px] text-[#f4f3ea]/75">{t('contractValue')} · {f.title.split(/\s[—–-]\s/)[0]}</span>
                              </div>
                              <span className="shrink-0 inline-flex items-center gap-2 text-[14px]">
                                {t('readCase')}
                                <ArrowCircle className="w-8 h-8 bg-accent text-white transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Phone menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#f4f3ea] text-[#1a1a17] flex flex-col px-[18px] pt-5 pb-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between h-[46px]">
              <Image src="/images/logo/island-tower-logo-dark.png" alt="" width={267} height={39} className="h-[18px] w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="h-[40px] px-4 rounded-full bg-[#1a1a17] text-[#f4f3ea] text-[14px] cursor-pointer focus-ring">
                {t('close')}
              </button>
            </div>
            <ul className="mt-14 flex flex-col gap-1">
              {[...links, { href: '/news', label: t('insights') }, { href: '/careers', label: t('careers') }, { href: '/contact', label: t('contact') }].map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={`flex items-center gap-3 font-serif text-[38px] leading-[1.2] tracking-[-0.015em] focus-ring ${isActive(l.href) ? 'text-[#1a1a17]' : 'text-[#1a1a17]/45'}`}
                  >
                    {isActive(l.href) && <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />}
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between text-[14px]">
              <a href="tel:+97142573677" dir="ltr">+971 4 257 3677</a>
              <LocaleSwitcher isScrolled variant="plain-dark" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
