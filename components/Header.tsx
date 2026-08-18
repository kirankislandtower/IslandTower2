'use client';

import Link from 'next/link';

interface HeaderProps {
  onDemoClick: () => void;
}

export default function Header({ onDemoClick }: HeaderProps) {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-6xl bg-[#2a2a2a]/90 backdrop-blur-md rounded-[10px] px-6 py-3 flex justify-between items-center shadow-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="https://www.islandtoweruae.ae/images/logo.png" 
            alt="Island Tower Logo" 
            className="h-6 md:h-7 w-auto object-contain"
          />
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">About Us</Link>
          <Link href="#expertise" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">Expertise</Link>
          <Link href="#projects" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">Projects</Link>
          <Link href="#contact" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase">Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#" className="text-gray-300 hover:text-white transition-colors text-xs font-medium tracking-widest uppercase px-4 py-2 bg-white/5 rounded-[6px] hover:bg-white/10">Client Portal</Link>
          <button 
            className="bg-[#94a3b8] text-white hover:bg-[#64748b] transition-colors px-5 py-2.5 rounded-[6px] text-xs font-medium tracking-widest uppercase"
            onClick={onDemoClick}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className="md:hidden text-white outline-none">
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
