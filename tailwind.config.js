/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-alabaster': {
          DEFAULT: '#FAF7F2',
          card: '#FFFFFF',
          subtle: '#F5F1EB',
          border: '#EFECE6',
        },
        'charcoal-slate': {
          DEFAULT: '#18181A',
          card: '#222226',
          light: '#2D2D32',
          border: '#3A3A40',
        },
        'himalayan-rose': {
          DEFAULT: '#E8998D',
          light: '#F4C7C0',
          badge: 'rgba(232, 153, 141, 0.15)',
        },
        'terracotta-rust': {
          DEFAULT: '#B85B43',
          hover: '#C66B53',
          dark: '#984530',
        },
        'soft-oat-gray': {
          DEFAULT: '#EFECE6',
          border: '#EFECE6',
          subtle: '#E8E4DD',
        },
        'smoked-driftwood': {
          DEFAULT: '#6E6B68',
          light: '#8F8C84',
          dark: '#4A4845',
        },
      },
      fontFamily: {
        canela: ['Canela', 'var(--font-canela)', 'var(--font-cormorant)', 'serif'],
        display: ['Canela', 'var(--font-canela)', 'var(--font-cormorant)', 'serif'],
        subheading: ['var(--font-subheading)', 'var(--font-jakarta)', 'sans-serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-rose': '0 10px 30px rgba(232, 153, 141, 0.25)',
        'glow-terracotta': '0 10px 30px rgba(184, 91, 67, 0.3)',
      },
    },
  },
  plugins: [],
};
