import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a',
        'slate': {
          '900': '#0f172a',
        },
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'on-accent': 'var(--color-on-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(33 31 28 / 0.06)',
        DEFAULT: '0 2px 4px -1px rgb(33 31 28 / 0.08), 0 1px 2px -1px rgb(33 31 28 / 0.06)',
        md: '0 6px 10px -2px rgb(33 31 28 / 0.10), 0 3px 5px -3px rgb(33 31 28 / 0.08)',
        lg: '0 12px 24px -8px rgb(33 31 28 / 0.16), 0 4px 8px -4px rgb(33 31 28 / 0.10)',
        xl: '0 20px 40px -12px rgb(33 31 28 / 0.20), 0 8px 16px -6px rgb(33 31 28 / 0.12)',
        '2xl': '0 32px 64px -16px rgb(33 31 28 / 0.28)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
export default config
