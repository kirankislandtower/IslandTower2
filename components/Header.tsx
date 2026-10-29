'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

interface HeaderProps {
  onDemoClick: () => void;
}

const PHONE_DISPLAY = '+971 4 257 3677';
const PHONE_HREF = 'tel:+97142573677';
const EMAIL = 'info@islandtoweruae.ae';
const EASE = [0.76, 0, 0.24, 1] as const;

// Shared with the hero so both sit on the same 12-column grid and gutter.
export const PAGE_GUTTER = 'px-[22px] md:px-8';
export const LABEL = 'font-mono text-[14px] leading-[1.25] tracking-[0.09em] uppercase';

export default function Header({ onDemoClick }: HeaderProps) {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: t('about'), href: '/about' },
    { label: t('services'), href: '/services' },
    { label: t('projects'), href: '/projects' },
    { label: t('insights'), href: '/news' },
    { label: t('careers'), href: '/careers' },
    { label: t('contact'), href: '/contact' },
  ];
  const MENU_LINKS = [{ label: t('home'), href: '/' }, ...NAV_LINKS];

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 140);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      {/* Top of page: laid out on the hero, scrolls away with it */}
      <header className={`absolute top-0 inset-x-0 z-40 ${PAGE_GUTTER} pt-6 text-white`}>
        <div className="grid grid-cols-12 gap-x-6 items-start">
          <Link href="/" className="col-span-6 md:col-span-3 flex items-center h-[18px] focus-ring w-fit" aria-label="Island Tower — Home">
            <Image
              src="/images/logo/island-tower-logo.png"
              alt="Island Tower Electromechanical Works LLC"
              width={267}
              height={39}
              priority
              className="h-[17px] md:h-[19px] w-auto"
            />
          </Link>

          <span className={`hidden lg:block col-span-5 ${LABEL} text-white`}>{t('descriptor')}</span>

          <nav className="hidden lg:block col-span-3" aria-label={t('mainNav')}>
            <ul className="flex flex-col leading-[1.25]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`block w-fit ${LABEL} transition-colors focus-ring ${isActive(link.href) ? 'text-accent' : 'text-white hover:text-white/60'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <LocaleSwitcher isScrolled={false} variant="plain" />
              </li>
            </ul>
          </nav>

          <div className="col-span-6 lg:col-span-1 flex justify-end">
            <MenuIcon open={false} onClick={() => setMenuOpen(true)} label={t('menu')} className="text-white" />
          </div>
        </div>
      </header>

      {/* After scrolling: only the essentials stay, top right */}
      <AnimatePresence>
        {compact && !menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-6 end-[22px] md:end-8 z-50 flex items-center gap-1"
          >
            <Link
              href="/contact"
              className="inline-flex items-center h-6 px-2 bg-[#1c1f24]/85 backdrop-blur-sm text-white font-mono text-[14px] leading-none tracking-[0.09em] uppercase hover:bg-accent transition-colors focus-ring"
            >
              {t('contact')}
            </Link>
            <MenuIcon open={false} onClick={() => setMenuOpen(true)} label={t('menu')} className="bg-[#1c1f24]/85 backdrop-blur-sm text-white hover:bg-accent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            data-lenis-prevent
            initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="fixed inset-0 z-[60] bg-white text-black overflow-y-auto"
          >
            <div className={`relative min-h-full ${PAGE_GUTTER} pt-7 pb-8 flex flex-col`}>
              <div className="absolute top-6 end-[22px] md:end-8 flex items-center gap-1">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center h-6 px-2 bg-[#1c1f24] text-white font-mono text-[14px] leading-none tracking-[0.09em] uppercase hover:bg-accent transition-colors focus-ring"
                >
                  {t('contact')}
                </Link>
                <MenuIcon open onClick={() => setMenuOpen(false)} label={t('close')} className="text-black" />
              </div>

              <div className="flex-1 grid grid-cols-12 gap-x-6 gap-y-14 pt-12 lg:pt-0">
                <ul className="col-span-12 lg:col-span-8 flex flex-col">
                  {MENU_LINKS.map((link, idx) => (
                    <li key={link.href} className="overflow-hidden">
                      <motion.div
                        initial={reduceMotion ? false : { y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.7, delay: 0.25 + idx * 0.05, ease: EASE }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={isActive(link.href) ? 'page' : undefined}
                          className={`inline-block text-[34px] md:text-[46px] leading-[1.1] md:leading-[1.08] font-medium tracking-[-0.01em] transition-colors focus-ring ${
                            isActive(link.href) ? 'text-accent' : 'hover:text-black/50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                  className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-between gap-14"
                >
                  <div className="hidden lg:block relative w-[216px] h-[270px] overflow-hidden bg-muted">
                    <Image src="/images/site/large-diameter-pipe-install.jpg" alt={t('menuImageAlt')} fill sizes="216px" className="object-cover" />
                  </div>

                  <div className={`flex flex-col gap-10 ${LABEL}`}>
                    <div>
                      <span className="text-black/45">{t('contactHeading')}</span>
                      <div className="mt-5 flex flex-col">
                        <a href={PHONE_HREF} dir="ltr" className="w-fit hover:text-accent transition-colors focus-ring">{PHONE_DISPLAY}</a>
                        <a href={`mailto:${EMAIL}`} className="w-fit hover:text-accent transition-colors focus-ring">{EMAIL}</a>
                      </div>
                    </div>
                    <div>
                      <span className="text-black/45">{t('headOffice')}</span>
                      <p className="mt-5 max-w-[300px]">{t('address')}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                      <LocaleSwitcher isScrolled variant="plain-dark" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-14">
                <Image src="/images/logo/island-tower-logo-dark.png" alt="" aria-hidden="true" width={267} height={39} className="h-7 md:h-8 w-auto" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 24×24, like ESR: two thin lines, crossing into an X when open.
function MenuIcon({ open, onClick, label, className = '' }: { open: boolean; onClick: () => void; label: string; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      aria-controls="site-menu"
      className={`relative inline-flex items-center justify-center w-6 h-6 transition-colors cursor-pointer focus-ring ${className}`}
    >
      <span className="relative block w-[15px] h-[5px]" aria-hidden="true">
        <span className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${open ? 'top-[2px] rotate-45 scale-x-[1.25]' : 'top-0'}`} />
        <span className={`absolute left-0 right-0 h-px bg-current transition-transform duration-300 ${open ? 'top-[2px] -rotate-45 scale-x-[1.25]' : 'top-[4px]'}`} />
      </span>
    </button>
  );
}
