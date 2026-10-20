import type { Config } from 'tailwindcss'

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './content/**/*.ts'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        ink: v('ink'),
        paper: v('paper'),
        surface: v('surface'),
        muted: v('muted'),
        line: v('line'),
        brand: { DEFAULT: v('brand'), strong: v('brand-strong'), tint: v('brand-tint') },
        success: v('success'),
        danger: v('danger'),
      },
      fontFamily: {
        display: ['"Sora Variable"', 'Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': ['clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)', { lineHeight: '1.4' }],
        'fluid-sm': ['clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)', { lineHeight: '1.55' }],
        'fluid-base': ['clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)', { lineHeight: '1.65' }],
        'fluid-lg': ['clamp(1.125rem, 1.06rem + 0.3vw, 1.3125rem)', { lineHeight: '1.55' }],
        'fluid-xl': ['clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)', { lineHeight: '1.25' }],
        'fluid-2xl': ['clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)', { lineHeight: '1.12' }],
        'fluid-3xl': ['clamp(2.25rem, 1.6rem + 3vw, 4.25rem)', { lineHeight: '1.04' }],
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem', '3xl': '1.75rem' },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.06), 0 8px 24px -12px rgb(var(--shadow) / 0.18)',
        lift: '0 2px 4px rgb(var(--shadow) / 0.06), 0 24px 48px -20px rgb(var(--shadow) / 0.32)',
      },
      maxWidth: { prose: '68ch' },
    },
  },
  plugins: [],
} satisfies Config
