'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher({ isScrolled, variant = 'pill' }: { isScrolled: boolean; variant?: 'pill' | 'plain' | 'plain-dark' }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <button
      onClick={() => {
        router.replace(pathname, { locale: nextLocale });
      }}
      aria-label={nextLocale === 'ar' ? 'Switch to Arabic' : 'Switch to English'}
      className={
        variant === 'plain'
          ? 'transition-colors text-[14px] leading-[1.25] text-white hover:text-white/60 focus-ring cursor-pointer'
          : variant === 'plain-dark'
          ? 'transition-colors text-[14px] leading-[1.25] text-black hover:text-accent focus-ring cursor-pointer'
          : `transition-colors text-xs font-mono font-medium tracking-widest uppercase px-3 py-2 rounded-[6px] focus-ring cursor-pointer ${
              isScrolled ? 'text-gray-700 hover:text-black bg-black/5 hover:bg-black/10' : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'
            }`
      }
    >
      {nextLocale === 'ar' ? 'العربية' : 'EN'}
    </button>
  );
}
