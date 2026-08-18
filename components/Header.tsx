'use client';

import Link from 'next/link';

interface HeaderProps {
  onDemoClick: () => void;
}

export default function Header({ onDemoClick }: HeaderProps) {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-6xl bg-[#1c1f24]/90 backdrop-blur-md rounded-[10px] px-6 py-3 flex justify-between items-center shadow-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity focus-ring">
          <img
            src="https://www.islandtoweruae.ae/images/logo.png"
            alt="Island Tower Logo"
            className="h-6 md:h-7 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-gray-300 hover:text-white transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring">About Us</Link>
          <Link href="#expertise" className="text-gray-300 hover:text-white transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring">Expertise</Link>
          <Link href="#projects" className="text-gray-300 hover:text-white transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring">Projects</Link>
          <Link href="#contact" className="text-gray-300 hover:text-white transition-colors text-xs font-mono font-medium tracking-widest uppercase focus-ring">Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-mono font-medium tracking-widest uppercase px-4 py-2 bg-white/5 rounded-[6px] hover:bg-white/10 focus-ring">Client Portal</Link>
          <button
            className="bg-accent text-on-accent hover:bg-accent/90 transition-colors px-5 py-2.5 rounded-[6px] text-xs font-mono font-medium tracking-widest uppercase cursor-pointer focus-ring"
            onClick={onDemoClick}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className="md:hidden text-white cursor-pointer focus-ring" aria-label="Open menu">
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
