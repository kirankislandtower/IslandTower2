'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface HeaderProps {
  onDemoClick: () => void;
}

const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Expertise', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ onDemoClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Non-home pages don't have a tall hero to scroll past before the bar
  // should read as "scrolled" (white). Treat them as scrolled from the start.
  const isHome = pathname === '/';
  const isScrolled = !isHome || scrolled;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className={`w-full max-w-6xl backdrop-blur-md rounded-[10px] px-6 py-3 flex justify-between items-center shadow-xl transition-colors duration-300 ${
          isScrolled ? 'bg-white/95' : 'bg-[#1c1f24]/90'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity focus-ring">
          <img
            src="https://cdn.jsdelivr.net/gh/kirank860/island-tower-assets@main/main-logo.jpeg"
            alt="Island Tower Logo"
            className="h-8 md:h-9 w-auto object-contain rounded-md bg-white p-1 shadow-sm"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring ${
                pathname === link.href
                  ? isScrolled ? 'text-black' : 'text-white'
                  : isScrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase px-4 py-2 rounded-[6px] focus-ring ${
              isScrolled ? 'text-gray-700 hover:text-black bg-black/5 hover:bg-black/10' : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            Client Portal
          </Link>
          <button
            className="bg-accent text-on-accent hover:bg-accent/90 transition-colors px-5 py-2.5 rounded-[6px] text-xs font-mono font-medium tracking-widest uppercase cursor-pointer focus-ring"
            onClick={onDemoClick}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden cursor-pointer focus-ring transition-colors relative z-10 ${isScrolled ? 'text-black' : 'text-white'}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden absolute top-[calc(100%+8px)] left-4 right-4 bg-[#1c1f24] rounded-[10px] shadow-2xl px-6 py-6 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  className={`block py-3 text-sm font-mono tracking-widest uppercase border-b border-white/10 transition-colors focus-ring ${
                    pathname === link.href ? 'text-accent' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: NAV_LINKS.length * 0.05, ease: 'easeOut' }}
              onClick={() => {
                setMenuOpen(false);
                onDemoClick();
              }}
              className="mt-4 bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-6 py-3.5 rounded-[6px] hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
            >
              Get a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
