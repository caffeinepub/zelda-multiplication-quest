import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        cinzel: ['Georgia', '"Times New Roman"', 'serif'],
        'cinzel-decorative': ['Georgia', '"Times New Roman"', 'serif'],
        'im-fell': ['Georgia', '"Times New Roman"', 'serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        zelda: {
          parchment: 'oklch(var(--zelda-parchment))',
          'parchment-dark': 'oklch(var(--zelda-parchment-dark))',
          gold: 'oklch(var(--zelda-gold) / <alpha-value>)',
          'gold-bright': 'oklch(var(--zelda-gold-bright))',
          green: 'oklch(var(--zelda-green))',
          'green-dark': 'oklch(var(--zelda-green-dark))',
          brown: 'oklch(var(--zelda-brown) / <alpha-value>)',
          'brown-dark': 'oklch(var(--zelda-brown-dark))',
          red: 'oklch(var(--zelda-red) / <alpha-value>)',
          'red-bright': 'oklch(var(--zelda-red-bright))',
        },
        ocean: {
          deep: 'oklch(var(--ocean-deep) / <alpha-value>)',
          mid: 'oklch(var(--ocean-mid) / <alpha-value>)',
          teal: 'oklch(var(--ocean-teal) / <alpha-value>)',
          'teal-bright': 'oklch(var(--ocean-teal-bright) / <alpha-value>)',
          green: 'oklch(var(--ocean-green) / <alpha-value>)',
          'green-bright': 'oklch(var(--ocean-green-bright) / <alpha-value>)',
          white: 'oklch(var(--ocean-white) / <alpha-value>)',
          'white-dim': 'oklch(var(--ocean-white-dim) / <alpha-value>)',
          glow: 'oklch(var(--ocean-glow) / <alpha-value>)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        zelda: '0 0 0 2px oklch(var(--zelda-gold)), 0 0 0 5px oklch(var(--zelda-brown)), 0 8px 32px rgba(0,0,0,0.4)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
