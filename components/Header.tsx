'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onDemoClick: () => void;
}

export default function Header({ onDemoClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className={`w-full max-w-6xl backdrop-blur-md rounded-[10px] px-6 py-3 flex justify-between items-center shadow-xl transition-colors duration-300 ${
          scrolled ? 'bg-white/95' : 'bg-[#1c1f24]/90'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity focus-ring">
          <img
            src={scrolled ? 'https://www.islandtoweruae.ae/images/logob.png' : 'https://www.islandtoweruae.ae/images/logo.png'}
            alt="Island Tower Logo"
            className="h-6 md:h-7 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring ${scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'}`}>About Us</Link>
          <Link href="/#expertise" className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring ${scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Expertise</Link>
          <Link href="/#projects" className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring ${scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Projects</Link>
          <Link href="/#contact" className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring ${scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className={`transition-colors text-xs font-mono font-medium tracking-widest uppercase px-4 py-2 rounded-[6px] focus-ring ${
              scrolled ? 'text-gray-700 hover:text-black bg-black/5 hover:bg-black/10' : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'
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

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className={`md:hidden cursor-pointer focus-ring transition-colors ${scrolled ? 'text-black' : 'text-white'}`} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
