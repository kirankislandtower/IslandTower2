'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Weighted, eased page scrolling. Lenis drives the native scroll position,
// so framer-motion's useScroll / sticky pins keep working unchanged.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -90 }, autoRaf: true });
    window.__lenis = lenis;
    document.documentElement.style.scrollBehavior = 'auto';

    return () => {
      lenis.destroy();
      delete window.__lenis;
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return null;
}
