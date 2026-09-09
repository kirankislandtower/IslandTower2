'use client';

import Link from 'next/link';

interface FooterProps {
  onDemoClick: () => void;
}

export default function Footer({ onDemoClick }: FooterProps) {
  return (
    <footer className="bg-[#1c1f24] w-full pt-32 pb-16" id="contact">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 gap-8">
          <h2 className="text-6xl md:text-8xl text-white font-normal tracking-tight">
            Contact Us
          </h2>
          <button
            onClick={onDemoClick}
            className="bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-8 py-4 hover:bg-accent/90 transition-colors whitespace-nowrap cursor-pointer focus-ring"
          >
            GET A QUOTE
          </button>
        </div>

        {/* Bottom Section (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 font-mono text-xs uppercase tracking-widest text-white/70 leading-relaxed">

          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">GET IN TOUCH</span>
            <a href="tel:+97142573677" className="hover:text-accent transition-colors focus-ring w-fit">
              ISLAND TOWER LLC<br />
              DUBAI, UAE<br />
              RIYADH, SAUDI ARABIA<br />
              +971 4 257 3677
            </a>
            <a href="mailto:info@islandtoweruae.ae" className="hover:text-accent transition-colors focus-ring w-fit">
              INFO@ISLANDTOWERUAE.AE
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">COMPANY</span>
            <Link href="/" className="hover:text-accent transition-colors focus-ring">HOME</Link>
            <Link href="/about" className="hover:text-accent transition-colors focus-ring">ABOUT US</Link>
            <Link href="/services" className="hover:text-accent transition-colors focus-ring">EXPERTISE</Link>
            <Link href="/projects" className="hover:text-accent transition-colors focus-ring">PROJECTS</Link>
            <Link href="/careers" className="hover:text-accent transition-colors focus-ring">CAREERS</Link>
            <Link href="/portal" className="hover:text-accent transition-colors focus-ring">CLIENT PORTAL</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">HOW WE WORK</span>
            <Link href="/services#quality" className="hover:text-accent transition-colors focus-ring">QUALITY</Link>
            <Link href="/services#hse" className="hover:text-accent transition-colors focus-ring">HSE</Link>
            <Link href="/services#sustainability" className="hover:text-accent transition-colors focus-ring">SUSTAINABILITY</Link>
            <Link href="/contact" className="hover:text-accent transition-colors focus-ring">CONTACT US</Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <span className="text-white/40">FOLLOW US</span>
            <a
              href="https://www.linkedin.com/company/island-tower-electromechanical-works/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/70 hover:text-accent transition-colors w-fit mt-1 focus-ring"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>&copy; {new Date().getFullYear()} Island Tower Electro Mechanical Works LLC. All rights reserved.</span>
          <span>Dubai, UAE &middot; Riyadh, KSA</span>
        </div>
      </div>
    </footer>
  );
}
