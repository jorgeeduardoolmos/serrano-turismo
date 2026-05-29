import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#15222D',
          '2': '#1E303D',
          '3': '#2B3E4B',
          soft: '#51626D',
        },
        brand: {
          DEFAULT: '#ED7A1A',
          strong: '#D5620A',
          deep: '#B14E05',
          tint: '#FDEEDD',
        },
        gold: {
          DEFAULT: '#C49A3D',
          soft: '#E7D6AC',
          deep: '#9E7A26',
        },
        paper: {
          DEFAULT: '#FBF8F3',
          '2': '#F4EEE4',
        },
        muted: '#6E7C86',
        surface: '#FFFFFF',
      },
      fontFamily: {
        head: ['var(--font-head)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '18px',
        lg: '26px',
        xl: '36px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(21,34,45,.06), 0 2px 8px rgba(21,34,45,.05)',
        md: '0 6px 18px rgba(21,34,45,.08), 0 2px 6px rgba(21,34,45,.05)',
        lg: '0 24px 60px rgba(21,34,45,.16), 0 8px 20px rgba(21,34,45,.08)',
        brand: '0 14px 34px rgba(213,98,10,.32)',
        gold: '0 12px 30px rgba(158,122,38,.28)',
      },
      maxWidth: {
        wrap: '1200px',
        wide: '1340px',
      },
    },
  },
  plugins: [],
}

export default config
