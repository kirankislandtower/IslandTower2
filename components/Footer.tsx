'use client';

import Link from 'next/link';

interface FooterProps {
  onDemoClick: () => void;
}

export default function Footer({ onDemoClick }: FooterProps) {
  return (
    <footer className="bg-[#ebedea] w-full pt-32 pb-16" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 gap-8">
          <h2 className="text-6xl md:text-8xl text-[#111] font-normal tracking-tight">
            Contact Us
          </h2>
          <button 
            onClick={onDemoClick}
            className="bg-[#94a3b8] text-white font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#64748b] transition-colors whitespace-nowrap"
          >
            GET A QUOTE
          </button>
        </div>

        {/* Bottom Section (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 font-mono text-xs uppercase tracking-widest text-[#111] leading-relaxed">
          
          {/* Column 1 */}
          <div>
            ISLAND TOWER LLC<br />
            DUBAI, UAE<br />
            RIYADH, SAUDI ARABIA<br />
            +971 4 257 3677<br />
            INFO@ISLANDTOWERUAE.AE
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="hover:text-[#94a3b8] transition-colors">HOME</Link>
            <Link href="#about" className="hover:text-[#94a3b8] transition-colors">ABOUT US</Link>
            <Link href="#expertise" className="hover:text-[#94a3b8] transition-colors">EXPERTISE</Link>
            <Link href="#projects" className="hover:text-[#94a3b8] transition-colors">PROJECTS</Link>
            <Link href="#careers" className="hover:text-[#94a3b8] transition-colors">CAREERS</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <Link href="#quality" className="hover:text-[#94a3b8] transition-colors">QUALITY</Link>
            <Link href="#hse" className="hover:text-[#94a3b8] transition-colors">HSE</Link>
            <Link href="#sustainability" className="hover:text-[#94a3b8] transition-colors">SUSTAINABILITY</Link>
            <Link href="#contact" className="hover:text-[#94a3b8] transition-colors">CONTACT US</Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <span>FOLLOW US</span>
            <a href="#" className="hover:opacity-70 transition-opacity w-fit mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
