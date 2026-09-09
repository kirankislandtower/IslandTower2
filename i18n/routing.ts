import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // Without this, next-intl's middleware auto-detects a preferred locale
  // from the NEXT_LOCALE cookie (set after any visit to /ar) or the
  // Accept-Language header, and silently redirects EVERY unprefixed
  // request to /ar/... once that cookie exists - meaning a plain English
  // URL like /about stops being reachable at its own canonical path after
  // a user has ever viewed the Arabic site once. Since this project's own
  // LocaleSwitcher already handles language changes explicitly via
  // real navigation, automatic detection only fights that and breaks
  // canonical URL stability - keep every route's language tied purely to
  // its URL, never to a cookie or browser header.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
